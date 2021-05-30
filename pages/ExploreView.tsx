import React, { useState, useEffect } from 'react'
import NFTItemCard from '../components/NFTItemCard'
import { Layout } from '../components'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ethers } from 'ethers'
import { GALLERY_ABI } from '../constants/gallery'
import { getNetworkLibrary } from '../connectors'
import NFT from '../types'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import AccountId from '../components/AccountId'
import ReactPaginate from 'react-paginate-next'
import { gql, useLazyQuery } from '@apollo/client'

interface IProps {
  created?: boolean
  owned?: boolean
}

const GALLERY_QUERY = gql`
  query HomePage($id: String) {
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
  }
`

const ExploreView: React.VFC<IProps> = ({ created, owned }) => {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [filteredNfts, setFilteredNfts] = useState<NFT[]>([])
  const router = useRouter()
  const { account, page } = router.query
  const [loadingState, setLoadingState] = useState<boolean>(true)
  const [count] = useState<number>(12)
  const [pageNumber] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)

  const [
    loadCollection,
    { called, loading, data },
  ] = useLazyQuery(GALLERY_QUERY, {
    variables: { id: account?.toString()?.toLowerCase() },
  })

  const next = () => {
    if (!page || parseInt(!!page && page.toString()) >= pageCount) return
    router.push(`/gallery?page=${parseInt(!!page && page.toString()) + 1}`)
  }

  const previous = () => {
    if (!page || parseInt(!!page && page.toString()) <= 1) return
    router.push(`/gallery?page=${parseInt(!!page && page.toString()) - 1}`)
  }

  const handlePageClick = (newPage: { selected: number }) => {
    router.push(`/gallery?page=${newPage.selected + 1}`)
  }

  useEffect(() => {
    if ((!created && !owned) || !account || !data) return
    console.log('DATA', data)
    getCollectionIds(data)
  }, [data])

  useEffect(() => {
    if ((!created && !owned) || !account) return
    loadCollection()
  }, [account])

  useEffect(() => {
    if (!!created || !!owned) return
    if (pageCount === 0) return
    loadTokens(!page ? 1 : parseInt(page.toString()))
  }, [pageCount, account, pageNumber, page])

  useEffect(() => {
    if (!!created || !!owned) return
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

    var page_count = Math.floor(total_supply / count)

    setTotalSupply(total_supply)
    setPageCount(page_count)
  }

  async function getCollectionIds(data) {
    let ids

    if (created) {
      ids = data.account.created.map((i) => i.id)
    }

    if (owned) {
      ids = data.account.items.map((i) => i.id)
    }

    let filteredIds = ids.filter((v, i) => ids.indexOf(v) === i)
    let ascending = filteredIds.sort(function (a, b) {
      return a - b
    })

    console.log('IDS', ascending)

    await getNFTs(ascending)

    setLoadingState(false)
  }

  async function loadTokens(pageNumber) {
    setLoadingState(true)

    let lowRange = totalSupply - count * pageNumber

    if (lowRange < 0) {
      lowRange = 0
    }

    const result = new Array(count).fill(true).map((e, i) => i + 1 + lowRange)

    const filteredResults = result.filter((i) => i > 0)

    console.log('SUPPLIES', filteredResults)

    await getNFTs(filteredResults)

    setLoadingState(false)
  }

  const getNFTs = async (range: number[]) => {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ID,
      GALLERY_ABI,
      getNetworkLibrary(),
    )
    console.log('HERE 1')

    var allMetadata = await Promise.all(
      range.map(async (id) => {
        if (id === 122) return null
        var ownerOf = await contract.ownerOf(id)
        if (ownerOf === '0x000000000000000000000000000000000000dEaD')
          return null

        var uri = await contract.tokenURI(id)
        if (uri.includes(undefined)) return null
        var metadata = await axios.get(uri)
        metadata.data.tokenId = id

        return metadata.data
      }),
    )

    console.log('HERE #', allMetadata)
    const filteredMeta = allMetadata.filter((i) => i !== null)

    setNfts(filteredMeta.reverse())
  }

  // useEffect(() => {
  //   updateInput(input)
  // }, [nfts])

  // const updateInput = async (input) => {
  //   if (input === '') {
  //     setFilteredNfts(nfts)
  //   }

  //   const filtered = nfts.filter((nft) => {
  //     return JSON.stringify(nft).toLowerCase().includes(input.toLowerCase())
  //   })
  //   setInput(input)
  //   setFilteredNfts(filtered)
  // }

  if (loadingState)
    return (
      <Layout>
        <div className={'md:mt-12 pb-8 max-w-xl mx-auto'}>loading...</div>
      </Layout>
    )

  return (
    <div className={'flex flex-col space-y-4 '}>
      <div
        className={'grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto mt-24 '}
      >
        {!created && !owned ? (
          <></>
        ) : (
          // <SearchBar input={input} onChange={updateInput} />
          <div className={'absolute -mt-16 text-3xl font-bold'}>
            <AccountId address={account.toString()} />
          </div>
        )}
        {!loadingState ? (
          nfts.map((item, key) => (
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
        ) : (
          <NFTItemCard loading={true} />
        )}
      </div>

      {!created && !owned && pageCount > 1 && (
        <div className={'flex'}>
          {(!!page && parseInt(page.toString()) > 1) && <button
            type="button"
            onClick={previous}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>}

          <ReactPaginate
            previousLabel={''}
            nextLabel={''}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={
              'flex w-full bg-red-400 justify-center items-center h-10'
            }
            pageClassName={
              'flex justify-center items-center w-10 bg-white text-red-400 m-2'
            }
            activeClassName={'active'}
          />
          {(!!page && parseInt(page.toString()) < pageCount) && <button
            type="button"
            onClick={next}
            className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>}
        </div>
      )}
    </div>
  )
}

export default ExploreView
