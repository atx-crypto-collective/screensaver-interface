import React from 'react'
import ImageCard from '../ImageCard'
import { IProps } from './types'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { GALLERY_ABI } from '../../constants/gallery'
import { getNetworkLibrary } from '../../connectors'
import AccountId from '../AccountId'
import { gql, useLazyQuery } from '@apollo/client'

var utils = require('ethers').utils

const BID_QUERY = gql`
  query Bid($item: String) {
    bidLogs(where: { item: $item, accepted: true }) {
      id
      item {
        id
      }
      amount
      accepted
      canceled
    }
  }
`

const NFTItemCard: React.FC<IProps> = ({ nft, creator, cardLoading }) => {
  const [currentBid, setCurrentBid] = useState<number | undefined | null>()
  const [lastSale, setLastSale] = useState<number | undefined>()
  const [forSale, setForSale] = useState(false)

  const [loadBids, { loading, error, data }] = useLazyQuery(BID_QUERY, {
    variables: { item: nft?.tokenId.toString() },
  })

  // get current bids
  async function currentBids() {
    if (!nft?.tokenId) return

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ID,
      GALLERY_ABI,
      getNetworkLibrary(),
    )

    var currentBid = await contract.currentBidDetailsOfToken(nft.tokenId)

    if (utils.formatEther(currentBid[0]) === '0.0') {
      setCurrentBid(null)
    } else {
      setCurrentBid(utils.formatEther(currentBid[0]))
    }
  }

  // get approved
  async function getApproved() {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ID,
      GALLERY_ABI,
      getNetworkLibrary(),
    )
    var approvedAddress = await contract.getApproved(nft?.tokenId)

    setForSale(approvedAddress === process.env.NEXT_PUBLIC_CONTRACT_ID)
  }

  useEffect(() => {
    if (currentBid !== null || currentBid === undefined) return;
    loadBids()
  }, [currentBid])

  useEffect(() => {
    if (loading || !data) return;

    if (data.bidLogs.length > 0) {
      const sortedByMostRecentBids = data.bidLogs.sort(function (x, y) {
        return y.timestamp - x.timestamp
      })
      setLastSale(utils.formatEther(sortedByMostRecentBids[0].amount))
    }
  }, [data])

  useEffect(() => {
    if (cardLoading) return
    getApproved()
    currentBids()
  }, [])

  return cardLoading ? (
    <div style={{ width: '345px', height: '618px' }}>
      <div className={'animate-pulse w-full rounded-xl h-full'}>
        <div
          className={'animation-pulse w-full rounded-xl h-full bg-gray-800'}
        />
      </div>
    </div>
  ) : (
    <ImageCard
      nft={nft}
      srcUrl={nft.mediaUri}
      footer={
        <div className={'py-3 bg-white bg-opacity-5 font-medium px-5'}>
          <div className={'flex flex-col h-20 justify-center'}>
            {!lastSale && (
              <>
                <div className={'text-xl font-medium'}>CURRENT BID</div>
                <div className={'text-3xl font-light'}>
                  {!!currentBid ? (
                    `${currentBid} MATIC`
                  ) : forSale ? (
                    <div className={'text-xl font-light mt-2 text-gray-100'}>
                      No bids yet
                    </div>
                  ) : (
                    <div className={'text-xl font-light mt-2 text-gray-100'}>
                      Not for sale
                    </div>
                  )}
                </div>
              </>
            )}

            {(!!lastSale && !currentBid) && (
              <>
                <div className={'text-xl font-medium'}>LASTEST SALE</div>

                <div className={'text-3xl font-light'}>
                  {`${lastSale} MATIC`}
                </div>
              </>
            )}
          </div>
        </div>
      }
    >
      <div
        className={
          'flex flex-col justify-start space-y-2 px-5 overflow-hidden h-24'
        }
      >
        <h1 className={'font-bold text-2xl text-white mt-1'}>{nft.name}</h1>
        <h2 className={'font-medium text-l'}>
          <AccountId linkToCreated address={nft.creator.id} />
        </h2>
      </div>
    </ImageCard>
  )
}

export default NFTItemCard
