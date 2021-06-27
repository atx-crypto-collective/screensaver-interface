import { useState, useEffect } from 'react';
import { utils } from 'ethers';
import { useWeb3React } from '@web3-react/core';

export function useMaticBalance() {
  const [balance, setBalance] = useState(0);
  const { account, library } = useWeb3React();

  async function getMaticBalance() {
    const balance = await library.getSigner(account).getBalance();
    const intBalance = utils.formatEther(balance);
    setBalance(Number(intBalance));
  }

  useEffect(() => {
    if (account) {
      getMaticBalance();
    }
  }, [account]);

  return balance;
}
