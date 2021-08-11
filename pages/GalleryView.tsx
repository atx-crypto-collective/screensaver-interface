import React, { useState, useEffect, useCallback } from 'react'
import NFTItemCard from '../components/NFTItemCard'
import { Layout } from '../components'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ethers } from 'ethers'
import { GALLERY_ABI } from '../constants/gallery'
import { getNetworkLibrary } from '../connectors'
import NFT from '../types'
import { gql, useQuery } from '@apollo/client'
import { db } from '../config/firebase'
import {
  useWindowWidth
} from '@react-hook/window-size'
 

interface IProps {
  created?: boolean
  owned?: boolean
  admin?: boolean
}

const GALLERY_QUERY = gql`
  query Gallery($first: Int, $skip: Int, $orderBy: String, $orderDirection: String) {
    artworks(
        first: $first,
        skip: $skip,
        orderBy: $orderBy,
        orderDirection: $orderDirection,
        where: {burned: false}
        ) {
      id
      mimeType
      tokenId
      tagsString
      currentBid {
        id
        bidder {
          id
        }
        amount
        accepted
        canceled
        timestamp
      }
      description
      name
      mediaUri
      forSale
      creator {
        id
      }
      owner {
        id
      }
    }
  }
`
const ExploreView: React.VFC<IProps> = ({ created, owned, admin }) => {

  const [nfts, setNfts] = useState<NFT[]>([])

  const { loading, error, data, fetchMore } = useQuery(GALLERY_QUERY,{
    variables: {
        first: 48,
        skip: 0,
        orderBy: 'creationDate',
        orderDirection: 'desc',
      }
    }
  )

  const getNfts = async (data) => {
    setNfts([...nfts, ...data])
  };

  const onLoadMore = useCallback(() => {
    if (
      Math.round(window.scrollY + window.innerHeight) >=
      Math.round(document.body.scrollHeight)
    ) {
      fetchMore({
        variables: {
          skip: nfts.length
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return fetchMoreResult;
        }
      });
    }
  }, [fetchMore, nfts.length]);

  useEffect(() => {
    data ? getNfts(data.artworks) : console.log("loading");
  }, [data]);

  useEffect(() => {
    window.addEventListener("scroll", onLoadMore);
    return () => {
      window.removeEventListener("scroll", onLoadMore);
    };
  }, [onLoadMore]);

  const getNFTs = async (range: number[]) => {

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ID,
      GALLERY_ABI,
      getNetworkLibrary(),
    )

    var allMetadata = await Promise.all(
      range.map(async (id) => {
        try {
          console.log("HERE")
          var uri = await contract.tokenURI(id)
          console.log("URI", uri)
          if (uri.includes(undefined)) return null
          var metadata = await axios.get(uri)
          metadata.data.tokenId = id
          return metadata.data
        } catch (error) {
          console.log('ERROR getting token URI', error)
          return null
        }
      }),
    )

    const filteredMeta = allMetadata.filter((i) => i !== null)
    setNfts(filteredMeta.reverse())
  }

  if (error) {
    return (
      <Layout>
        <div className={'md:mt-12 pb-8 max-w-xl mx-auto'}>{error}</div>
      </Layout>
    )
  }

  return (
      <div className={'flex flex-col space-y-4'}>
        <div
          className={'grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-2 sm:mx-auto md:mt-36'}
        >{
            nfts.map((item, key) => (
              <div key={key}>
                <NFTItemCard
                  nft={item}
                  title={item?.name}
                  coverImageSrc={item?.mediaUri}
                  creator={item?.creator.id}
                  endDateTime={new Date('1/1/count00')}
                  tokenId={item?.tokenId}
                />
              </div>
            ))

            }

        </div>

        {!!loading && <div className={'pb-8 max-w-xl mx-auto w-fulltext-white'}>loading...</div>}

      </div>
  )
}

export default ExploreView
