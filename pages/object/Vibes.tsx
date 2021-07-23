import React from 'react'
import { useState, useEffect } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import VIBES_WELLSPRING_ABI from '../../constants/abis/vibes'
import { getNetworkLibrary } from '../../connectors'
import ReportButton from '../../components/ReportButton'
import BurnButton from '../../components/BurnButton'

var utils = require('ethers').utils

interface IProps {
  tokenId: string
}

const Vibes = ({ tokenId }) => {
  const { account, library } = useWeb3React<Web3Provider>()
  const [approvalStatus, setApprovalStatus] = useState<boolean | undefined>()
  const [ownerOf, setOwnerOf] = useState<boolean>(false)
  const [approvalLoading, setApprovalLoading] = useState<boolean>(false)
  const [nftOwner, setNFTOwner] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isContractOwner, setIsContractOwner] = useState<boolean>(false)
  const [hasBurnerRole, setHasBurnerRole] = useState<boolean>(false)
  const [bidExists, setBidExists] = useState<boolean>(false)

  // ownerOf
  async function checkOwnerOf() {
    try {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ID,
        VIBES_WELLSPRING_ABI,
        getNetworkLibrary(),
      )

      var ownerOf = await contract.ownerOf(tokenId)
      var contractOwner = await contract.owner()
      var accountHasBurnerRole = await contract.hasRole("0x9667e80708b6eeeb0053fa0cca44e028ff548e2a9f029edfeac87c118b08b7c8", account) 
      const accountIsContractOwner = contractOwner === account

      setIsContractOwner(accountIsContractOwner)
      setHasBurnerRole(accountHasBurnerRole)
      setNFTOwner(ownerOf)

      if (ownerOf !== account) return

      setOwnerOf(true)
    } catch (error) {
      console.log('error')
      setOwnerOf(false)
    }
  }

  // // get current bids
  // async function currentBids() {
  //   const contract = new ethers.Contract(
  //     process.env.NEXT_PUBLIC_CONTRACT_ID,
  //     GALLERY_ABI,
  //     getNetworkLibrary(),
  //   )

  //   var currentBid = await contract.currentBidDetailsOfToken(tokenId)

  //   if (utils.formatEther(currentBid[0]) === '0.0') {
  //     setBidExists(false)
  //   } else {
  //     setBidExists(true)
  //   }
  // }

  // // get approved
  // async function getApproved() {
  //   try {
  //     const contract = new ethers.Contract(
  //       process.env.NEXT_PUBLIC_CONTRACT_ID,
  //       GALLERY_ABI,
  //       getNetworkLibrary(),
  //     )
  //     var approvedAddress = await contract.getApproved(tokenId)

  //     setApprovalStatus(approvedAddress === process.env.NEXT_PUBLIC_CONTRACT_ID)
  //   } catch (error) {
  //     console.log('error', error)
  //     setApprovalStatus(false)
  //   }
  // }

  // // approve sales
  // async function removeFromSale() {
  //   try {
  //     setApprovalLoading(true)

  //     const contract = new ethers.Contract(
  //       process.env.NEXT_PUBLIC_CONTRACT_ID,
  //       GALLERY_ABI,
  //       library.getSigner(account),
  //     )

  //     const tx = await contract.approve('0x0000000000000000000000000000000000000000', tokenId);

  //     console.log('APPROVAL CALLED')

  //     setLoading(true)

  //     const receipt = await tx.wait()

  //     console.log('WAIT', receipt)

  //     getApproved()
  //     setLoading(false)

  //     setApprovalLoading(false)
  //   } catch (error) {
  //     console.log('error')
  //   }
  // }

  // // approve sales
  // async function approve() {
  //   try {
  //     setApprovalLoading(true)

  //     const contract = new ethers.Contract(
  //       process.env.NEXT_PUBLIC_CONTRACT_ID,
  //       GALLERY_ABI,
  //       library.getSigner(account),
  //     )

  //     const tx = await contract.approve(
  //       process.env.NEXT_PUBLIC_CONTRACT_ID,
  //       tokenId,
  //     )

  //     setLoading(true)

  //     const receipt = await tx.wait()

  //     getApproved()
  //     setLoading(false)
  //     setApprovalLoading(false)

  //   } catch (error) {
  //     console.log('error')
  //   }
  // }

  useEffect(() => {
    checkOwnerOf()
    // getApproved()
    // currentBids()
  }, [account])

  return (
    <div>HELLA FRIGGIN VIBES</div>
  )
}

export default Vibes
