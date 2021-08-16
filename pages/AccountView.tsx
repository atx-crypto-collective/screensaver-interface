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
      where: { burned: false, owner: $account, creator_not: $account}
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

const ACTIVE_QUERY = gql`
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
      where: { burned: false, currentBid_not: null, creator: $account }
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
    switch(state) {
      case 'owned':
        return OWNER_QUERY
      case 'active':
        return ACTIVE_QUERY
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
    if (state === "active") {
      let tempData = data
      let filteredTempData = tempData.filter( nft => nft.currentBid.accepted !== true)
      console.log("DATA TEMP", filteredTempData)
      setNfts([...nfts, ...filteredTempData])
    } else {
      setNfts([...nfts, ...data])
    }

  }

  const onLoadMore = useCallback(() => {

    if (fetchMore === undefined) return;

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
    <div className={'flex flex-col items-center space-y-6 mt-10 md:mt-0'}>
    
    <div className={'h-14 w-14 rounded-full focus:outline-none hover:shadow-white'}><img style={{borderRadius: '50%'}}src={makeBlockie(account.toString())} /></div>
        <div className={'text-2xl'}><AccountId address={account.toString()} link={'twitter'}/></div>

        <span className="relative z-0 justify-center rounded-md">
          <Link href={`/created/${account}`}>
            <button
              type="button"
              className={classNames(
                state === 'created' ? 'bg-white text-black' : 'bg-black text-white', "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-light hover:font-bold focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              )}
            >
              Created
            </button>
          </Link>
          <Link href={`/owned/${account}`}>
            <button
              type="button"
              className={classNames(
                state === 'owned' ? 'bg-white text-black' : 'bg-black text-white', "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-light hover:font-bold focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              )} >
              Owned
            </button>
          </Link>
          <Link href={`/active/${account}`}>
            <button
              type="button"
              className={classNames(
                state === 'active' ? 'bg-white text-black' : 'bg-black text-white', "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-light hover:font-bold focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              )}>
              Active
            </button>
          </Link>
        </span>

      {(!loading && nfts.length === 0 && !data) && (
        <div className="flex items-center justify-center text-md font-light h-12">
          This address has no {state ? 'created' : state ? 'owned' : ''}{' '}
          objects.
        </div>
      )}

      <div
        className={'grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-2 sm:mx-auto'}
      >
        {nfts.map((item, key) => (
          <div key={key}>
            <NFTItemCard
              nft={item}
              tokenId={item?.tokenId}
            />
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
