import React, { useState, useEffect } from 'react'
import NFTItemCard from '../components/NFTItemCard'
import { Layout, Navbar } from '../components'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { GALLERY_ABI } from '../constants/gallery'
import { getNetworkLibrary } from '../connectors'
import NFT from '../types'

interface IProps {
  collection: boolean
}

const ExploreView: React.VFC<IProps> = ({collection}) => {
  const [openTab, setOpenTab] = useState<'active' | 'completed'>('active')
  const [nfts, setNfts] = useState< NFT[] >([])
    // TODO: Pull item by slug from router

  // state : preview & not preview 

  const {
    chainId,
    account,
    activate,
    active,
    deactivate,
    library,
  } = useWeb3React<Web3Provider>()

  const router = useRouter()
  const { tokenId , preview } = router.query
  const [uri , setUri] = useState< undefined | string >()
  const [loading , setLoading] = useState< boolean >(true)
  const [metadata , setMetadata] = useState< NFT | undefined >()
  const [offset, setOffset] = useState< number >(0)
  const [noMore, setNoMore] = useState< boolean >(false)

  async function getMetadata() {
    var meta = await axios.get(uri)
    console.log(meta)
    var tempMetadata = meta.data
    tempMetadata.creationDate = new Date(meta.data.creationDate).toString()
    setMetadata(tempMetadata)
  }

  async function loadTokens() {

    if (offset === 0) {
      setLoading(true)
    }

    const contract = new ethers.Contract(    
      process.env.NEXT_PUBLIC_CONTRACT_ID,
      GALLERY_ABI,
      getNetworkLibrary()
    )

    var totalSupply = await contract.totalSupply()

    var total = totalSupply.toNumber() 

    if (total <= 20) {
      setNoMore(true)
    }

    var lowRange;
    var range;
    var result;

    if (offset === 0) {
      lowRange = total - 20

      lowRange = lowRange <= 0 ? 0 : lowRange

      range = total - lowRange 

      result = new Array(range).fill(true).map((e, i) => i + 1 + lowRange);
    } else {
      lowRange = offset - 20 

      range = offset - lowRange 

      result = new Array(range).fill(true).map((e, i) => i + 1 + lowRange);
    }

    console.log(total, result)

    if (result.filter(i => i <= 0).length > 1) {
      setNoMore(true)
    }

    const filteredResults = result.filter(i => i > 0)

    console.log(total, filteredResults)

    await getNFTs(filteredResults)
    
    // set new offset 
    setOffset(lowRange)
    setLoading(false)

  }

  const getNFTs = async (range: number[]) => {

    const contract = new ethers.Contract(    
      process.env.NEXT_PUBLIC_CONTRACT_ID,
      GALLERY_ABI,
      getNetworkLibrary()
    )

    var collectedNFTs = [];
  
    var allMetadata = await Promise.all(
      range.map(async (id) => {
        var uri = await contract.tokenURI(id)
        var metadata = await axios.get(uri)
        metadata.data.tokenId = id
        console.log(metadata)

        if (collection) {
          var ownerOf = await contract.ownerOf(id)

          if (ownerOf === account) {
            collectedNFTs.push(metadata.data)
          }
        }
        return metadata.data 
      })
    )

    if (collection) {
      setNfts([...nfts, ...collectedNFTs.reverse()])
    } else {
      setNfts([...nfts, ...allMetadata.reverse()])
    }

    if (collection && (nfts.length < 20 || !noMore)) {
      loadTokens()
    }

  }

  useEffect(() => {
    loadTokens()
  }, [])

  if (loading) return <Layout><div className={'md:mt-12 pb-8 max-w-xl mx-auto'}>Loading...</div></Layout>

  return (
    <div className={'flex flex-col space-y-4'}>
   
      <div className={'grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto'}>
    
        {
          nfts.map((item, key) => (
            <div key={key}>
              <NFTItemCard
                nft={item}
                title={item?.name}
                coverImageSrc={item?.image}
                creator={item?.creator}
                endDateTime={new Date('1/1/2000')}
                amountCollected={100}
                tokenId={item?.tokenId}
              />
            </div>
          ))}
          {/** more button */}
  
      </div>
      { !noMore && <button 
          onClick={() => loadTokens()}
          className="mt-4 w-full justify-center inline-flex items-center px-6 py-3 border border-red-300 shadow-sm text-red-300 font-medium rounded-xs text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >Load More</button>}
    </div>
  )
}

export default ExploreView
