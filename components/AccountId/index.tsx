import React, { useEffect } from 'react'
import useAxios from 'axios-hooks'
import { shortenAddress } from '../../utils'

export default function AccountId({address}) {
    const [{ data, loading, error }, refetch] = useAxios(
        `https://us-central1-proofoftwitter.cloudfunctions.net/api/user/?address=${address}`
      )

      useEffect(() => {
          console.log("DATA", data)
      }, [data])
    
      if (loading || !data?.twitterId) return <>{!!address && shortenAddress(address)}</>
      if (error) return <p>Error!</p>
      if (!data) return <p>Error!</p>

      return (
        <div>
          @{data.twitterId}
        </div>
      )
}
