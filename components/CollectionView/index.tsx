import React, { useState, useEffect, useCallback } from 'react'
import NFTItemCard from '../NFTItemCard'
import { Layout } from '..'
import NFT from '../../types'
import { gql, useQuery } from '@apollo/client'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { Collection } from '../../types'

interface IProps {
    collection: Collection
}

const COLLECTION_QUERY = gql`
  query Collection($ids: [Int]) {
    artworks(where: {id_in: $ids}) {
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
const CollectionView: React.VFC<IProps> = ({ collection }) => {
  const [nfts, setNfts] = useState<NFT[]>([])
  const { loading, error, data, fetchMore } = useQuery(
    COLLECTION_QUERY,
    {
      variables: {
        ids: collection.ids
      },
    },
  )

  const getNfts = async (data) => {
    setNfts([...nfts, ...data])
  }

//   const onLoadMore = useCallback(() => {
//     if (
//       Math.round(window.scrollY + window.innerHeight) >=
//       Math.round(document.body.scrollHeight)
//     ) {
//       console.log('LOAD MORE', nfts.length)

//       fetchMore({
//         variables: {
//           skip: nfts.length,
//         },
//         updateQuery: (prev, { fetchMoreResult }) => {
//           if (!fetchMoreResult) return prev
//           return fetchMoreResult
//         },
//       })
//     }
//   }, [fetchMore, nfts.length])

  useEffect(() => {
    console.log('DATA', data, nfts.length)
    data ? getNfts(data.artworks) : console.log('loading')
  }, [data])

//   useEffect(() => {
//     window.addEventListener('scroll', onLoadMore)
//     return () => {
//       window.removeEventListener('scroll', onLoadMore)
//     }
//   }, [onLoadMore])

  if (error) {
    return (
      <Layout>
        <div className={'md:mt-12 pb-8 max-w-xl mx-auto'}>{error}</div>
      </Layout>
    )
  }

  return (
    <div className={'flex flex-col space-y-4 mt-32 max-w-8xl mx-auto items-center'}>
        <div className={'text-2xl font-bold flex items-center my-2'}>{collection.title}</div>
        <div className={'text-md font-light flex items-center my-2'}>{collection.description}</div>
        <div className={'text-md font-light flex items-center mb-10'}>{collection.address}</div>
      <div
        className={'grid gap-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-2 sm:mx-auto'}
      >
        {nfts.map((item, key) => (
          <div key={key}>
            <NFTItemCard nft={item} tokenId={item?.tokenId} />
          </div>
        ))}
      </div>

      {!!loading && (
        <div className={'pb-8 max-w-xl mx-auto w-fulltext-white'}>
          loading...
        </div>
      )}
    </div>
  )
}

export default CollectionView
