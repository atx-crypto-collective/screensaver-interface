import { CheckCircleIcon } from '@heroicons/react/solid'
import AccountId from '../../components/AccountId'
import { gql, useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import moment from 'moment'

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
      bidder {
          id
      }
      timestamp
    }
  }
`
interface IProps {
  tokenId: string
}

type Bid = {
  bidder: string
  timestamp: string
  amount: number
}

const BidHistory = ({ tokenId }) => {
  const [bidLogs, setBidLogs] = useState<undefined | Bid[]>()
  const { loading, error, data } = useQuery(BID_QUERY, {
    variables: { item: tokenId.toString() },
  })
  const options = { year: "numeric", month: "long", day: "numeric" }


  useEffect(() => {
    if (loading) return

    if (data.bidLogs.length > 0) {
      const sortedByMostRecentBids = data.bidLogs.sort(function (x, y) {
        return y.timestamp - x.timestamp
      })

      const mappedBids = sortedByMostRecentBids.map((bid) => {
        return {
          bidder: bid.bidder.id,
          amount: utils.formatEther(bid.amount),
          timestamp: moment.unix(bid.timestamp).format("MMMM D, YYYY h:mm a")
        }
      })

      setBidLogs(mappedBids)
    }
  }, [data])

  if (loading || !bidLogs) {
    return <div>loading bid history...</div>
  }

  return (
    <div className="bg-black shadow overflow-hidden sm:rounded-md mt-6">
      <ul className="divide-y divide-gray-200">
        {bidLogs.map((bid) => (
          <div className="px-2 py-4 w-full">
              <div className="min-w-0 flex justify-between">
                <div>
                  <AccountId address={bid.bidder} />
                  <p className="mt-2 flex items-center text-sm ">
                    <span className="truncate">{bid.timestamp}</span>
                  </p>
                </div>
                <div>
                  <div>
                    <p className="md:text-xl font-bold">{bid.amount} MATIC</p>
                    <p className="mt-2 flex items-center text-sm ">
                      <CheckCircleIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                        aria-hidden="true"
                      />
                      Bid Accepted
                    </p>
                  </div>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default BidHistory
