import React, { useState, useEffect } from 'react'
import NFTItemCard from '../components/NFTItemCard'
import { Layout } from '../components'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ethers } from 'ethers'
import { GALLERY_ABI } from '../constants/gallery'
import { getNetworkLibrary } from '../connectors'
import NFT from '../types'
import SearchBar from '../components/SearchBar'
import AccountId from '../components/AccountId'
import ReactPaginate from 'react-paginate-next';
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { gql, useLazyQuery } from "@apollo/client";

interface IProps {
  collection: boolean
}

const GALLERY_QUERY = gql`query HomePage($id: String) {
  account(id: $id) {
    id
    address
    isWhitelisted
    created {
      id
    }
    items {
      id
    }
  }
}`

const ExploreView: React.VFC<IProps> = ({ collection }) => {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [filteredNfts, setFilteredNfts] = useState<NFT[]>([])
  const router = useRouter()
  const { account, page } = router.query
  const [loadingState, setLoadingState] = useState<boolean>(true)
  const [count] = useState<number>(12)
  const [input, setInput] = useState('')
  const [pageNumber, ] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)

  const [loadCollection, { called, loading, data }] = useLazyQuery(
    GALLERY_QUERY,
    { variables: { id: account?.toString()?.toLowerCase() } }
  );

  const handlePageClick = (newPage: { selected: number }) => {
    router.push(`/gallery?page=${newPage.selected + 1}`)
  }

  useEffect(() => {
    if (!collection || !account) return
    console.log("DATA", data)
    getCollectionIds(data)
  }, [data])

  useEffect(() => {
    if (!collection || !account) return
    loadCollection()
  }, [account])

  useEffect(() => {
    console.log("PAGE", page)
    if (collection) return;
    if (!account && !!collection || pageCount === 0) return
    loadTokens(!page ? 1 : (parseInt(page.toString())))
  }, [pageCount, account, collection, pageNumber, page])

  useEffect(() => {
    if (collection) return;
    getPageCount()
  }, [])

  async function getPageCount() {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ID,
      GALLERY_ABI,
      getNetworkLibrary(),
    )

    var supply = await contract.totalSupply()

    var total_supply = supply.toNumber()

    var page_count = Math.floor(total_supply/count)

    setTotalSupply(total_supply)
    setPageCount(page_count)
  }

  async function getCollectionIds(data) {

    //combine items and created arrays 
    let ids = data.account.items.map(i => i.id).concat(data.account.created.map(i => i.id))
    console.log("IDS", ids)
    let filteredIds = ids.filter((v,i) => ids.indexOf(v) === i)

    await getNFTs(filteredIds)

    setLoadingState(false)

  }

  async function loadTokens(pageNumber) {

    setLoadingState(true)

    let lowRange = totalSupply - (count * pageNumber)

    if (lowRange < 0) {
      lowRange = 0 
    }

    const result = new Array(count).fill(true).map((e, i) => i + 1 + lowRange)

    const filteredResults = result.filter((i) => i > 0)

    console.log("SUPPLIES", filteredResults)

    await getNFTs(filteredResults)

    setLoadingState(false)
  }

  const getNFTs = async (range: number[]) => {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ID,
      GALLERY_ABI,
      getNetworkLibrary(),
    )

    var collectedNFTs = []

    var allMetadata = await Promise.all(
      range.map(async (id) => {
        if (id === 122) return null
        var uri = await contract.tokenURI(id)
        // console.log('URI HEERER', uri)

        if (uri.includes(undefined)) return null
        var metadata = await axios.get(uri)
        metadata.data.tokenId = id
        // console.log(metadata)
        var ownerOf = await contract.ownerOf(id)
        // console.log('COLLECTED THIS', account, ownerOf)

        if (ownerOf === "0x000000000000000000000000000000000000dEaD") return null
        
        if (collection) {
          
          if (ownerOf === account) {
            collectedNFTs.push(metadata.data)
          }
        }
        return metadata.data
      }),
    )

    const filteredMeta = allMetadata.filter((i) => i !== null)
    const filteredCollected = collectedNFTs.filter((i) => i !== null)

    if (collection) {
      setNfts(filteredCollected.reverse())
    } else {
      setNfts(filteredMeta.reverse())
    }

  }

  useEffect(() => {
    updateInput(input)
  }, [nfts])

  const updateInput = async (input) => {
    if (input === '') {
      setFilteredNfts(nfts)
    }

    const filtered = nfts.filter((nft) => {
      return JSON.stringify(nft).toLowerCase().includes(input.toLowerCase())
    })
    setInput(input)
    setFilteredNfts(filtered)
  }


  if (loadingState) return <Layout><div className={'md:mt-12 pb-8 max-w-xl mx-auto'}>loading...</div></Layout>
  // if (loadingState) return 'loadingState...'
  // if (error) return 'Something Bad Happened'

  return (
    <div className={'flex flex-col space-y-4 '}>
      <div
        className={'grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto mt-24 '}
      >
        {!collection ? (
          <SearchBar input={input} onChange={updateInput} />
        ) : (
          <div className={'absolute -mt-16 text-3xl font-bold'}>
            <AccountId address={account.toString()} />
          </div>
        )}
        {!loadingState
          ? filteredNfts.map((item, key) => (
              <div key={key}>
                <NFTItemCard
                  nft={item}
                  title={item?.name}
                  coverImageSrc={item?.image}
                  creator={item?.creator}
                  endDateTime={new Date('1/1/count00')}
                  amountCollected={count}
                  tokenId={item?.tokenId}
                />
              </div>
            ))
          : <NFTItemCard loading={true} /> }
      </div>

      {(!collection && pageCount > 1) && <ReactPaginate
          previousLabel={'< previous'}
          nextLabel={'next >'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'flex w-full bg-red-400 justify-center items-center h-10'}
          pageClassName={'flex justify-center items-center w-10 bg-white text-red-400 m-2'}
          activeClassName={'active'}
        />}
    </div>
  )
}

export default ExploreView
