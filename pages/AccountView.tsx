import React, { useState, useEffect, useCallback } from 'react'
import NFTItemCard from '../components/NFTItemCard'
import { Layout } from '../components'
import { useRouter } from 'next/router'
import NFT from '../types'
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import AccountId from '../components/AccountId'
import classNames from 'classnames'
import makeBlockie from 'ethereum-blockies-base64'

interface IProps {
  state: string
}

const CREATOR_QUERY = gql`
  query Gallery(
    $first: Int
    $skip: Int
    $orderBy: String
    $orderDirection: String
    $account: String
  ) {
    artworks(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: { burned: false, creator: $account }
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

const OWNER_QUERY = gql`
  query Gallery(
    $first: Int
    $skip: Int
    $orderBy: String
    $orderDirection: String
    $account: String
  ) {
    artworks(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: { burned: false, owner: $account, creator_not: $account }
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

const BIDS_QUERY = gql`
  query Bids(
    $first: Int
    $skip: Int
    $orderBy: String
    $orderDirection: String
    $account: String
  ) {
    account(
      first: $first
      skip: $skip
      id: $account
    ) {
      bids{
        item {
          id
          mimeType
          tokenId
          tagsString
          burned
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
        
    }
  }
`

const FOR_SALE_QUERY = gql`
  query Gallery(
    $first: Int
    $skip: Int
    $orderBy: String
    $orderDirection: String
    $account: String
  ) {
    artworks(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: { burned: false, forSale: true, owner: $account }
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

const AccountView: React.VFC<IProps> = ({ state }) => {
  const [nfts, setNfts] = useState<NFT[]>([])
  const router = useRouter()
  const { account } = router.query

  const getQuery = (state) => {
    switch (state) {
      case 'owned':
        return OWNER_QUERY
      case 'bids':
        return BIDS_QUERY
      case 'forSale':
        return FOR_SALE_QUERY
      default:
        return CREATOR_QUERY
    }
  }

  const { loading, error, data, fetchMore } = useQuery(getQuery(state), {
    variables: {
      first: 48,
      skip: 0,
      orderBy: 'creationDate',
      orderDirection: 'desc',
      account: account?.toString()?.toLowerCase(),
    },
  })

  const getNfts = async (data) => {
    console.log(data)
    if (state === 'bids') {
      console.log('DATA', data.bids)
      let tempData = data
      let filteredTempData = tempData.account.bids.filter(
        (nft) => nft.item?.currentBid?.accepted !== true && nft?.item?.forSale === true && nft?.item?.burned !== true && nft.item?.bidder === account,
      )
      let mappedItems = filteredTempData.map(
        nft => nft.item
      )
      setNfts([...nfts, ...mappedItems])
    } else {
      setNfts([...nfts, ...data.artworks])
    }
  }

  const onLoadMore = useCallback(() => {
    if (fetchMore === undefined) return

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
    data ? getNfts(data) : console.log('loading')
  }, [data])

  useEffect(() => {
    if (!account) return
    onLoadMore()
  }, [account])

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
    <div className={'flex flex-col items-start space-y-6 mt-10 md:mt-0 mx-auto max-w-6xl'}>
      <div
        className={
          'h-20 w-20 rounded-full focus:outline-none hover:shadow-white'
        }
      >
        <img
          style={{ borderRadius: '50%' }}
          src={makeBlockie(account.toString())}
        />
      </div>
      <div className={'text-2xl'}>
        <AccountId address={account.toString()} link={'twitter'} />
      </div>

      <span className="flex justify-start border-gray-700 border-b text-md w-full">
        <Link href={`/created/${account}`}>
          <button
            type="button"
            className={classNames(
              state === 'created'
                ? 'border-b-2 font-medium'
                : 'font-light',
              'relative inline-flex items-center px-3 md:px-4 py-2 border-gray-300 font-light hover:font-bold focus:z-10 focus:outline-none outline-none',
            )}
          >
            CREATED
          </button>
        </Link>
        <Link href={`/owned/${account}`}>
          <button
            type="button"
            className={classNames(
              state === 'owned'
                ? 'border-b-2 font-medium'
                : 'font-light',
                'relative inline-flex items-center px-3 md:px-4 py-2 border-gray-300 font-light hover:font-bold focus:z-10 focus:outline-none outline-none',
                )}
          >
            OWNED
          </button>
        </Link>
        <Link href={`/forSale/${account}`}>
          <button
            type="button"
            className={classNames(
              state === 'forSale'
                ? 'border-b-2 font-medium'
                : 'font-light',
                'relative inline-flex items-center px-3 md:px-4 py-2 border-gray-300 font-light hover:font-bold focus:z-10 focus:outline-none outline-none',
                )}
          >
            FOR SALE
          </button>
        </Link>
        <Link href={`/bids/${account}`}>
          <button
            type="button"
            className={classNames(
              state === 'bids'
              ? 'border-b-2 font-medium'
              : 'font-light',
              'relative inline-flex items-center px-3 md:px-4 py-2 border-gray-300 font-light hover:font-bold focus:z-10 focus:outline-none outline-none',
            )}
          >
            BIDS
          </button>
        </Link>
      </span>

      {!loading && nfts.length === 0 && !data && (
        <div className="flex items-center justify-center text-md font-light h-12">
          This address has no {state ? 'created' : state ? 'owned' : ''}{' '}
          objects.
        </div>
      )}

      <div
        className={'grid gap-6 md:grid-cols-2 lg:grid-cols-3 '}
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

export default AccountView
