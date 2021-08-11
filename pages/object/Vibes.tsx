import React from 'react'
import { useState, useEffect } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { BigNumber, ethers } from 'ethers'
import VIBES_WELLSPRING_ABI from '../../constants/abis/vibes'
import { getNetworkLibrary } from '../../connectors'


interface IProps {
  tokenId: string
}

// VIBES ticker refresh in ms
const REFRESH_VIBES_INTERVAL = 1000;

// VIBES after render
interface VibesAtRender {
  initialClaimableVibes: BigNumber
  initialDateTime: Date
}

const formatVibes = (vibes: BigNumber, decimal = 18, toFixed = 3): string => {
  // convert to base 10
  const decimalVibes = vibes.toString();
  
  // Split into two parts
  const indexForDecimalPoint = decimalVibes.length - decimal;
  const wholeNumber = decimalVibes.slice(0, indexForDecimalPoint);
  const decimalNumber = decimalVibes.slice(indexForDecimalPoint);

  // Format and concatenate
  const formattedWholeNumber = wholeNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formattedDecimalNumber = decimalNumber.slice(0, toFixed);
  const formattedVibes = formattedWholeNumber + '.' + formattedDecimalNumber;

  // Return dat pretty boi
  return formattedVibes;
};

/**
 * Calculate live claimable VIBES and return in human-readable form
 */
const calculateLiveInfusedVibes = (initialVibes: VibesAtRender, dailyRate: BigNumber) => {
  const now = new Date();
  const { initialClaimableVibes, initialDateTime } = initialVibes;
  const msElapsed = now.getTime() - initialDateTime.getTime();

  // do math
  const vibesToAdd = dailyRate.mul(msElapsed).div(24 * 60 * 60 * 1000);
  const currentClaimableVibes = initialClaimableVibes.add(vibesToAdd);

  // format it real cute
  const formattedVibes = formatVibes(currentClaimableVibes);
  return formattedVibes;
};

const Vibes = ({ tokenId }) => {
  const { account } = useWeb3React<Web3Provider>()
  const [tokenInfo, setTokenInfo] = useState<Record<string, unknown> | undefined>();
  const [claimableVibes, setClaimableVibes] = useState<string>('');
  const [startDateTime, _] = useState<Date>(new Date());

  async function getVibes() {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_VIBES_CONTRACT_ID,
      VIBES_WELLSPRING_ABI,
      getNetworkLibrary(),
    )
    const tokenInfo = await contract.getToken(process.env.NEXT_PUBLIC_CONTRACT_ID, tokenId);
    if (tokenInfo) {
      setTokenInfo(tokenInfo);
    } 
  }

  function getClaimableVibes() {
    if (tokenInfo) {
      const claimableVibes = calculateLiveInfusedVibes({ initialClaimableVibes: tokenInfo.claimable as BigNumber, initialDateTime: startDateTime }, tokenInfo.dailyRate as BigNumber );
      setClaimableVibes(claimableVibes);
    }
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
