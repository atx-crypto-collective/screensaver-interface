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

// VIBES ticker refresh in ms
const REFRESH_VIBES_INTERVAL = 1000;

const calculateLiveInfusedVibes = (startingVibes, startDateTime, tokenInfo) => {
  const now = new Date();
  const msElapsed = now.getTime() - startDateTime.getTime();
  const { dailyRate } = tokenInfo;
  const dailyRateReadable = parseInt(ethers.BigNumber.from(dailyRate).toString()) / 1000000000000000000;
  const vibesToAdd = dailyRateReadable * (msElapsed / (24 * 60 * 60 * 1000));
  const claimableReadable = parseInt(ethers.BigNumber.from(startingVibes).toString()) / 1000000000000000000;
  const updatedVibes = (claimableReadable + vibesToAdd).toFixed(3);
  console.log(updatedVibes)
  return updatedVibes;
};

const Vibes = ({ tokenId }) => {
  const { account } = useWeb3React<Web3Provider>()
  const [tokenInfo, setTokenInfo] = useState<string>('');
  const [startingVibes, setStartingVibes] = useState<string>('');
  const [claimableVibes, setClaimableVibes] = useState<string>('');
  const [startDateTime, setStartDateTime] = useState<Date>();

  async function getVibes() {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_VIBES_CONTRACT_ID,
      VIBES_WELLSPRING_ABI,
      getNetworkLibrary(),
    )
    console.log(tokenId);
    const tokenInfo = await contract.getToken(process.env.NEXT_PUBLIC_CONTRACT_ID, tokenId);
    console.log({ tokenInfo })
    if (tokenInfo) {
      setTokenInfo(tokenInfo);
      setStartingVibes(tokenInfo.claimable);
      setStartDateTime(new Date());
    } 
  }

  async function getClaimableVibes() {
    const claimableVibes = tokenInfo ? calculateLiveInfusedVibes(startingVibes, startDateTime, tokenInfo) : '';
    setClaimableVibes(claimableVibes);
  }

  useEffect(() => {
    getVibes();
    const h = setInterval(getClaimableVibes, REFRESH_VIBES_INTERVAL);
    return () => clearInterval(h);
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
