import React from 'react'
import AccountId from '../../components/AccountId'
import BidRow from '../../components/BidRow'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { GALLERY_ABI } from '../../constants/gallery'
import { getNetworkLibrary } from '../../connectors'

interface IProps {
  tokenId: string
}

const BiddingDetailView = (
  {
    tokenId
  },
) => {
    const [value, setValue] = useState<string>()
    const {
      chainId,
      account,
      activate,
      active,
      deactivate,
      library,
    } = useWeb3React<Web3Provider>()
    const [bid, setBid] = useState<number | undefined>()
    const [approvalStatus, setApprovalStatus] = useState<boolean | undefined>()
    const [ownerOf, setOwnerOf] = useState<boolean>(false)
    const [approvalLoading, setApprovalLoading] = useState<boolean>(false)
    const [bidLoading, setBidLoading] = useState<boolean>(false)
    const [ nftOwner, setNFTOwner] = useState<string>('')
    const [ loading, setLoading] = useState<boolean>(false)

    let approvalTopic = ethers.utils.id('Approval(address,address,uint256)')
    let transferTopic = ethers.utils.id('Transfer(address,address,uint256)')

    const handleSubmit = (evt) => {
      evt.preventDefault()
      // contract call
      console.log('VALUE', value)
    }
  
    // get approved
    async function getApproved() {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ID,
        GALLERY_ABI,
        getNetworkLibrary(),
      )
      var approvedAddress = await contract.getApproved(tokenId)
  
      console.log('Approved Address', approvedAddress)

      setApprovalStatus(approvedAddress === process.env.NEXT_PUBLIC_CONTRACT_ID)
    }

    // ownerOf
    async function checkOwnerOf() {
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ID,
          GALLERY_ABI,
          getNetworkLibrary(),
        )
        var ownerOf = await contract.ownerOf(tokenId)

        let filter = {
          address: process.env.NEXT_PUBLIC_CONTRACT_ID,
          topics: [transferTopic],
        }

        const transfers = await contract.queryFilter(filter, 13905194, 13906194)

        console.log("TRANSFERS", transfers)
  

        setNFTOwner(ownerOf)
    
        console.log('Owner of', ownerOf)

        if (ownerOf !== account) return;

        setOwnerOf(true)

      }

          // approve sales
    async function approve() {
        setApprovalLoading(true)
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ID,
          GALLERY_ABI,
          library.getSigner(account),
        )
        const tx = await contract.approve(process.env.NEXT_PUBLIC_CONTRACT_ID, tokenId)
        setLoading(true)
    
        let filter = {
          address: process.env.NEXT_PUBLIC_CONTRACT_ID,
          topics: [approvalTopic],
        }
      
        getNetworkLibrary().on(filter, (result) => {
          console.log('APPROVED LISTENER', result.transactionHash, tx.hash)
          if (result.transactionHash === tx.hash) {
            getApproved()
            setLoading(false)
            getNetworkLibrary().off(filter, (offResult) => {console.log("OFF", offResult)})
            setApprovalLoading(false)
          }
        })
      }
  
    // accept active bid
    async function acceptBid() {
        setBidLoading(true)
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ID,
        GALLERY_ABI,
        library.getSigner(account),
      )
      const tx = await contract.acceptBid()

      let filter = {
        address: process.env.NEXT_PUBLIC_CONTRACT_ID,
        topics: [transferTopic],
      }
    
      getNetworkLibrary().on(filter, (result) => {
        console.log('APPROVED LISTENER', result.transactionHash, tx.hash)
        if (result.transactionHash === tx.hash) {
          getApproved()
          getNetworkLibrary().off(filter, (offResult) => {console.log("OFF", offResult)})
          setApprovalLoading(false)
        }
      })
    }
  
    // cancel active bid
    async function cancelBid() {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ID,
        GALLERY_ABI,
        library.getSigner(account),
      )

      const tx = await contract.cancelBid()

      let filter = {
        address: process.env.NEXT_PUBLIC_CONTRACT_ID,
        topics: [transferTopic],
      }
    
      getNetworkLibrary().on(filter, (result) => {
        console.log('APPROVED LISTENER', result.transactionHash, tx.hash)
        if (result.transactionHash === tx.hash) {
          getApproved()
          getNetworkLibrary().off(filter, (offResult) => {console.log("OFF", offResult)})
          setApprovalLoading(false)
        }
      })
    }
  
    // component mount - check ownerOf and approval status 

    useEffect(() => {
        checkOwnerOf()
        getApproved()
    }, [account])

  return (
    <div className={'flex flex-col space-y-12'}>
      <div className={'flex flex-col space-y-8'}>
        {/** if approved for sale */}

                  <div className={'text-sm p-3'}><strong>Collector: </strong><AccountId address={nftOwner}/></div>

                  <div className={'mt-12'}/>

        { !approvalStatus ?

        (ownerOf ? <button
            className="w-full h-14 justify-center inline-flex items-center border border-red-300 shadow-sm text-red-300 font-medium rounded-full text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        onClick={approve}>Set For Sale{loading && (
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
          )}</button> : <div className="w-full h-14 justify-center inline-flex items-center border border-gray-700 shadow-sm text-red-300 font-medium rounded-xs text-white bg-gray-900"
           >Not for sale</div>)

        :

        <>
            {/** if getApproved === contract address */}
            {!!tokenId && <BidRow tokenId={tokenId.toString()}/>}
    
            {/** if ownerOf - setSalePrice modal */}
            {/* {ownerOf ? 
            <button
              type="button"
              className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Set Sale Price
            </button>
            :
            // if not ownerOf - bid modal 
            <button
              type="button"
              className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Place Bid
            </button>
            } */}
        </>
    }

        
      </div>
    </div>
  )
}

export default BiddingDetailView
