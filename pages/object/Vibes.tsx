import React from 'react'
import { useState, useEffect } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import VIBES_WELLSPRING_ABI from '../../constants/abis/vibes'
import { getNetworkLibrary } from '../../connectors'


interface IProps {
  tokenId: string
}

const Vibes = ({ tokenId }) => {
  const { account, library } = useWeb3React<Web3Provider>()
  const [claimableVibes, setClaimableVibes] = useState<string>('');

  async function getVibes() {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_VIBES_CONTRACT_ID,
      VIBES_WELLSPRING_ABI,
      getNetworkLibrary(),
    )
    const tokenInfo = await contract.tokenInfo(tokenId);
    if (tokenInfo) {
      const { claimable } = tokenInfo;
      const claimableReadable = (parseInt(ethers.BigNumber.from(claimable).toString()) / 1000000000000000000).toFixed(2);
      setClaimableVibes(claimableReadable);
    }
  }

  useEffect(() => {
    getVibes()
  }, [account])

  return (
    <div className={'flex flex-col space-y-12'}>
      <div className={'flex flex-col space-y-8'}>
        <div className={'px-3 text-red-300'}>
          {claimableVibes.length ? `${claimableVibes} VIBES` : ''}
        </div>
      </div>
    </div>
  )
}

export default Vibes
