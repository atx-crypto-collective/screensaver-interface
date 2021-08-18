import React, { useState, useEffect, useCallback } from 'react'
import NFTItemCard from '../components/NFTItemCard'
import { Layout } from '../components'
import NFT from '../types'
import { gql, useQuery } from '@apollo/client'

interface IProps {
  created?: boolean
  owned?: boolean
  admin?: boolean
}

const GALLERY_QUERY = gql`
  query Gallery(
    $first: Int
    $skip: Int
    $orderBy: String
    $orderDirection: String
  ) {
    artworks(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: { burned: false, forSale: true }
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
const GalleryView: React.VFC<IProps> = ({ created, owned, admin }) => {
  const [nfts, setNfts] = useState<NFT[]>([])

  const { loading, error, data, fetchMore } = useQuery(GALLERY_QUERY, {
    variables: {
      first: 48,
      skip: 0,
      orderBy: 'creationDate',
      orderDirection: 'desc',
    },
  })

  const getNfts = async (data) => {
    setNfts([...nfts, ...data])
  }

  const onLoadMore = useCallback(() => {
    if (
      Math.round(window.scrollY + window.innerHeight) >=
      Math.round(document.body.scrollHeight)
    ) {
      fetchMore({
        variables: {
          skip: nfts.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          return fetchMoreResult
        },
      })
    }
  }, [fetchMore, nfts.length])

  useEffect(() => {
    data ? getNfts(data.artworks) : console.log('loading')
  }, [data])

  useEffect(() => {
    window.addEventListener('scroll', onLoadMore)
    return () => {
      window.removeEventListener('scroll', onLoadMore)
    }
  }, [onLoadMore])

  if (error) {
    return (
      <Layout>
        <div className={'md:mt-12 pb-8 max-w-xl mx-auto'}>{error}</div>
      </Layout>
    )
  }

  return (
    <div className={'flex flex-col space-y-4 md:mt-24'}>
      <div
        className={'grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-2 sm:mx-auto'}
      >
        {nfts.map((item, key) => (
          <div key={key}>
            <NFTItemCard nft={item} tokenId={item?.tokenId}/>
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

export default GalleryView
