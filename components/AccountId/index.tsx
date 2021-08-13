import React, { useEffect } from 'react'
import useAxios from 'axios-hooks'
import Link from 'next/link'
import { shortenAddress } from '../../utils'

interface Props {
    address: string
    link: string
}

export default function AccountId({address, link}: Props) {
    const [{ data, loading, error }, refetch] = useAxios(
        `https://us-central1-proofoftwitter.cloudfunctions.net/api/user/?address=${address}`
      )

      if (loading || !data?.twitterId) {
        return (
          <Link href={`created/${address}`}>
            <a className={'hover:bg-gray-800 p-2 -ml-2 rounded-md'}>{!!address && shortenAddress(address)}</a>
          </Link>
        )
      }

      if (error) return <p>Error!</p>
      if (!data) return <p>Error!</p>

      return (
        <div className={'font-bold text-md text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-300'}>
          <Link href={link === 'twitter' ?  `https://twitter.com/${data.twitterId}`: `/${link}/${address}`}>
            <a target={link === 'twitter' ? '_blank' : ''} className={'hover:bg-gray-800 hover:from-pink-300 hover:to-pink-400 p-2 -ml-2 rounded-md font-bold text-md text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-300'}>@{data.twitterId}</a>
          </Link>
        </div>
      )
}
