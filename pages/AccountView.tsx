import React, { useState, useEffect, useCallback } from 'react'
import NFTItemCard from '../components/NFTItemCard'
import { Layout } from '../components'
import axios from 'axios'
import { ethers } from 'ethers'
import AccountId from '../components/AccountId'
import { useRouter } from 'next/router'
import NFT from '../types'
import { gql, useLazyQuery } from '@apollo/client'
import { useWeb3React } from '@web3-react/core'

interface IProps {
  created?: boolean
  owned?: boolean
  admin?: boolean
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
      where: { burned: false, owner: $account }
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
const AccountView: React.VFC<IProps> = ({ created, owned }) => {
  const [nfts, setNfts] = useState<NFT[]>([])
  const router = useRouter()
  const { account } = router.query

  const [loadAccountData, { loading, error, data, fetchMore }] = useLazyQuery(
    created ? CREATOR_QUERY : OWNER_QUERY,
    {
      variables: {
        first: 48,
        skip: 0,
        orderBy: 'creationDate',
        orderDirection: 'desc',
        account: account?.toString()?.toLowerCase(),
      },
    },
  )

  useEffect(() => {
    if (!account) return
    loadAccountData()
  }, [account])

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
    <div className={'flex flex-col space-y-4'}>
      {created && (
        <div
          className={
            'flex items-center justify-center text-2xl font-light h-12'
          }
        >
          CREATED&nbsp; <AccountId address={account.toString()} />
        </div>
      )}
      {owned && (
        <div
          className={
            'flex items-center justify-center text-2xl font-light h-12'
          }
        >
          OWNED&nbsp; <AccountId address={account.toString()} />
        </div>
      )}

      {nfts.length === 0 && (
        <div className="flex items-center justify-center text-md font-light h-12">
          This address has no {created ? 'created' : owned ? 'owned' : ''}{' '}
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
              title={item?.name}
              coverImageSrc={item?.mediaUri}
              creator={item?.creator.id}
              endDateTime={new Date('1/1/count00')}
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
