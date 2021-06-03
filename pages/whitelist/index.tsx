import { Layout } from '../../components'
import React, { useState, useEffect } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { GALLERY_ABI } from '../../constants/gallery'
import { getNetworkLibrary } from '../../connectors'
import { shortenAddress } from "../../utils";

export default function Home() {
  const { account, library } = useWeb3React<Web3Provider>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [whitelistingLoading, setWhitelistingLoading] = useState(false)
  const url = 'https://us-central1-broccoli-df8cd.cloudfunctions.net/api'
  const [isWhitelisted, setIsWhitelisted] = useState(true)

  // ownerOf
  async function checkIsWhitelisted() {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_V0_CONTRACT_ID,
      GALLERY_ABI,
      getNetworkLibrary(),
    )
    var whitelistStatus = await contract.isWhitelisted(account)

    console.log('whitelistStatus', whitelistStatus)

    setIsWhitelisted(whitelistStatus)
    setLoading(false)
  }

  useEffect(() => {
    if (!account) return
    checkIsWhitelisted()
  }, [account])

  const fetchSeed = async () => {
    try {
      setWhitelistingLoading(true)
      const response = await fetch(`${url}/seed`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          account,
        }),
      })

      const data = await response.json()

      console.log('DATA', data)

      const signature = await library.getSigner().signMessage(data.seed)

      console.log('SEED IS', signature)

      const verificationResponse = await verify(signature)

      setTimeout(() => {
        checkIsWhitelisted()
        setWhitelistingLoading(false)
      }, 30000)

    } catch (err) {
      console.log('ERROR GETTING SEED', err)
    }
  }

  const verify = async (signature) => {
    setWhitelistingLoading(true)
    return fetch(`${url}/verify`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        signature,
        account,
      }),
    })
      .then((res) => {
        console.log('VERIFICATION RESPONSE', res.status)
      })
      .catch((err) => console.log('ERROR GETTING VERIFICATION', err))
  }

  if (!account) {
    return (
      <Layout>
        <div className={'flex w-full justify-center text-2xl font-bold mt-40'}>
          Connect with Metamask to view Whitelist status
        </div>{' '}
      </Layout>
    )
  }

  if (loading) {
    return (
      <Layout>
        <div className={'m-20'}>Loading...</div>{' '}
      </Layout>
    )
  }

  return (
    <Layout>
      {isWhitelisted ? (
        <div className={'flex w-full justify-center text-2xl font-bold mt-40'}>
          {`Account ${!!account && shortenAddress(account)} is whitelisted`}
        </div>
      ) : (
        <div className={'w-11/12 max-w-2xl mx-auto py-6'}>
          <h1 className={'text-2xl font-bold mb-3'}>Screensaver Terms of Service</h1>
          <p>Terms of service will go here...</p>
          <button
            onClick={fetchSeed}
            className="mt-4 w-full justify-center inline-flex items-center px-6 py-3 border border-red-300 shadow-sm text-red-300 font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            disabled={!account}
          >
            {!account ? 'Connect Wallet' : 'Agree to Terms of Service'}
            {whitelistingLoading && (
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
        </div>
      )}
    </Layout>
  )
}
