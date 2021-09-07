import React, { useState, useEffect, useCallback } from 'react'
import NFTItemCard from '../components/NFTItemCard'
import { Layout } from '../components'
import NFT from '../types'
import { gql, useLazyQuery } from '@apollo/client'
import classNames from 'classnames'

interface IProps {
  created?: boolean
  owned?: boolean
  admin?: boolean
}

const LISTINGS_QUERY = gql`
  query Listings($first: Int, $skip: Int, $orderDirection: String) {
    artworks(
      first: $first
      skip: $skip
      orderBy: "latestForSaleDate"
      orderDirection: $orderDirection
      where: { forSale: true, burned: false }
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
const MINTS_QUERY = gql`
  query Mints($first: Int, $skip: Int, $orderDirection: String) {
    artworks(
      first: $first
      skip: $skip
      orderBy: "creationDate"
      orderDirection: $orderDirection
      where: { burned: false }
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
  const [state, setState] = useState<'mints' | 'listings'>('listings')

  const getQuery = (state) => {
    switch (state) {
      case 'mints':
        return MINTS_QUERY
      default:
        return LISTINGS_QUERY
    }
  }

  useEffect(() => {
    console.log("STATE CHANGE", state, nfts)
    setNfts([])
  }, [state])

  useEffect(() => {
    if (nfts.length > 0) return
    loadGallery()
  }, [nfts])

  const [ loadGallery, { loading, error, data, fetchMore }] = useLazyQuery(getQuery(state), {
    fetchPolicy: "no-cache",
    variables: {
      first: 48,
      skip: 0,
      orderDirection: 'desc',
    },
  })

  const getNfts = async (data) => {
    console.log('ARTWORKS', data)
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
    console.log("DATA", data)
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
    <div className={'flex flex-col space-y-4 mt-32 '}>
      <span className="flex justify-start border-gray-700 border-b text-md w-full">
        <button
          onClick={() => setState('listings')}
          className={classNames(
            state === 'listings' ? 'border-b-2 font-medium' : 'font-light',
            'relative inline-flex items-center px-3 md:px-4 py-2 border-gray-300 font-light hover:font-bold focus:z-10 focus:outline-none outline-none',
          )}
        >
          Listings
        </button>
        <button
          onClick={() => setState('mints')}
          className={classNames(
            state === 'mints' ? 'border-b-2 font-medium' : 'font-light',
            'relative inline-flex items-center px-3 md:px-4 py-2 border-gray-300 font-light hover:font-bold focus:z-10 focus:outline-none outline-none',
          )}
        >
          Latest Mints
        </button>
      </span>
      <div
        className={'grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-2 sm:mx-auto'}
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

export default GalleryView
