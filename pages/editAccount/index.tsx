import { Layout } from '../../components'
import React, { useState, useEffect } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { GALLERY_ABI } from '../../constants/gallery'
import { getNetworkLibrary } from '../../connectors'
import { shortenAddress } from '../../utils'
import useAccountData from '../../hooks/useAccountData'
// import { db } from '../../config/firebase'

export default function Home() {
  const { account, library } = useWeb3React<Web3Provider>()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const url = 'https://us-central1-broccoli-df8cd.cloudfunctions.net/api'
  const [username, setUsername] = useState('')
  const [description, setDescription] = useState('')
  const [accountLoading, accountData] = useAccountData({account});

  useEffect(() => {
      if (!accountData) return;
      setUsername(accountData.username);
      setDescription(accountData.description);
  }, [accountData])
  
  const signMessage = async () => {
    try {
    setLoading(true)

      const originalMessage = {
        username,
        profileImage: 'url',
        bannerImage: 'url',
        description,
        timestamp: new Date(),
      }
      
      const signedMessage = await library
        .getSigner()
        .signMessage(JSON.stringify(originalMessage))

      console.log('SIGNED MESSAGE IS', signedMessage)

      await fetch(`${url}/account`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
            signedMessage,
            originalMessage,
            account
        }),
      })



      setLoading(false)
      router.push(`/created/${account}`)

    } catch (err) {
      console.log('ERROR GETTING SEED', err)
      setLoading(false)
    }
  }

  if (!account) {
    return (
      <Layout>
        <div className={'flex w-full justify-center text-2xl font-bold mt-40'}>
          Connect with Metamask to edit your account
        </div>{' '}
      </Layout>
    )
  }

  return (
    <Layout>
      <div className={'w-11/12 max-w-2xl mx-auto py-6'}>

      <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="mt-10 max-w-3xl text-3xl text-white font-bold">
                Edit Account
              </h3>
        
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">

              {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-700 sm:pt-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
                >
                  Username
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex shadow-sm">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="flex-1 block w-full focus:ring-red-500 focus:border-red-500 min-w-0 sm:text-sm border-gray-700 bg-gray-900"
                    />
                  </div>
                </div>
              </div> */}

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-700 sm:pt-5">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
                >
                  Description
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="max-w-lg shadow-sm block w-full focus:ring-red-500 focus:border-red-500 sm:text-sm border-gray-700  bg-gray-900"
                    defaultValue={''}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <p className="mt-2 text-sm text-gray-300">
                    Links, bio, whatever you want...
                  </p>
                </div>
              </div>
            </div>

            <div className={'text-white text-md font-regular mt-3'}>
              {/* {error && `Error occured.`} */}
            </div>
          </div>
        </div>
      </form>

        <button
          onClick={signMessage}
          className="mt-4 w-full justify-center inline-flex items-center px-6 py-3 border border-red-300 shadow-sm text-red-300 font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          disabled={!account}
        >
          Save
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
      </div>
    </Layout>
  )
}
