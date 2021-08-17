import { useState, useEffect } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { GALLERY_ABI } from '../constants/gallery'
import Modal from '../components/Modal'
import { getNetworkLibrary } from '../connectors'
import SetBid from './SetBid'
import AccountId from './AccountId'
import SetSalePrice from './SetSalePrice'

var utils = require('ethers').utils

// TODO: setQuantity
interface IProps {
  tokenId: string
}

const BidRow: React.VFC<IProps> = ({ tokenId }) => {
  const { chainId, account, library } = useWeb3React<Web3Provider>()
  const [bid, setBid] = useState<number | undefined>()
  const [bidder, setBidder] = useState<string | undefined>()
  const [ownerOf, setOwnerOf] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [salePrice, setSalePrice] = useState<number>(0)

  // ownerOf
  async function checkOwnerOf() {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ID,
      GALLERY_ABI,
      getNetworkLibrary(),
    )
    var ownerOf = await contract.ownerOf(tokenId)

    console.log('Owner of', ownerOf)

    if (ownerOf !== account) return

    setOwnerOf(true)
  }

  // get sale price
  async function getSalePrice() {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ID,
      GALLERY_ABI,
      getNetworkLibrary(),
    )
    var tokenPrice = await contract.tokenPrice(tokenId)

    console.log('Token Price', tokenPrice)

    if (tokenPrice !== 0) {
      setSalePrice(0)
    } else {
      setSalePrice(tokenPrice)
    }
  }

  // get current bids
  async function currentBids() {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ID,
      GALLERY_ABI,
      getNetworkLibrary(),
    )

    var currentBid = await contract.currentBidDetailsOfToken(tokenId)

    console.log(currentBid)

    if (utils.formatEther(currentBid[0]) === '0.0') {
      setBid(undefined)
      setBidder(currentBid[1])
    } else {
      setBid(utils.formatEther(currentBid[0]))
      setBidder(currentBid[1])
    }
  }

  // accept active bid
  async function acceptBid() {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ID,
      GALLERY_ABI,
      library.getSigner(account),
    )
    const tx = await contract.acceptBid(tokenId)
    setLoading(true)

    const receipt = await tx.wait()

    // setTimeout(() => {
    currentBids()
    setLoading(false)
    // }, 10000)
  }

  // cancel active bid
  async function cancelBid() {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ID,
      GALLERY_ABI,
      library.getSigner(account),
    )
    const tx = await contract.cancelBid(tokenId)

    setLoading(true)

    const receipt = await tx.wait()

    currentBids()
    setLoading(false)
  }

  // remove from sale
  async function buyNow() {}

  // remove from sale
  async function removeFromSale() {}

  // component mount check for current bid
  useEffect(() => {
    currentBids()
    checkOwnerOf()
    getSalePrice()
  }, [account])

  // if no bid do not show this coomponent

  return (
    <>
      <Modal
        status={chainId !== 137 ? 'switch-network' : 'connect'}
        open={open}
        setOpen={setOpen}
      />

      {/* set sale price */}

      {salePrice === 0 && (
        <div className="my-6">
          <div className="rounded-md px-6 py-5 sm:flex sm:items-start justify-between border-2 border-gray-700">
            <h4 className="sr-only">Visa</h4>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 sm:mt-0 sm:ml-4">
                <h3 className="text-lg leading-6 font-medium">
                  {salePrice} MATIC
                </h3>
              </div>
            </div>
            {/** if owner of token : accept , if bidder : cancel, if neither or if bidder : place bid*/}
            {!ownerOf ? (
              <button
                onClick={!!account ? buyNow : () => setOpen(true)}
                className="w-48 h-14 justify-center inline-flex items-center border border-red-300 shadow-sm text-red-300 font-medium rounded-full text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Buy Now
                {loading && (
                  <svg
                    className="animate-spin -mr-1 ml-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </button>
            ) : (
              <button
                onClick={!!account ? removeFromSale : () => setOpen(true)}
                className="w-48 h-14 justify-center inline-flex items-center border border-red-300 shadow-sm text-red-300 font-medium rounded-full text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Remove Sale
                {loading && (
                  <svg
                    className="animate-spin -mr-1 ml-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {ownerOf && (
        <SetSalePrice sale={false} tokenId={tokenId} onUpdate={currentBids} />
      )}
    </>
  )
}

export default BidRow
