import React from "react";
import { useState, useEffect } from "react";
import Modal from "../Modal";
import { useWeb3React } from "@web3-react/core";
import { shortenAddress } from "../../utils";
import { Web3Provider } from "@ethersproject/providers";
import { POLYGON_MAINNET_PARAMS } from '../../constants'
import { injected } from '../../connectors'

const utils = require('ethers').utils

export default function index() {

  const [open, setOpen] = useState(false);
  const [maticTokenBalance, setMaticTokenBalance] = useState<number>(0)

  const {
    chainId,
    account,
    library,
  } = useWeb3React<Web3Provider>()

  async function switchToPolygon() {
    injected.getProvider().then(provider => {
      provider
        .request({
          method: 'wallet_addEthereumChain',
          params: [POLYGON_MAINNET_PARAMS]
        })
        .catch((error: any) => {
          console.log(error)
        })
    })
  }

  async function maticBalanceOf() {
    var balance = await library.getSigner(account).getBalance()
    var intBalance = utils.formatEther(balance)
    setMaticTokenBalance(Number(intBalance))
  }

  useEffect(() => {
    if (!account) return
    maticBalanceOf()
  }, [account])

  return (
    <>
      <Modal status={"connect"} open={open} setOpen={setOpen} />

      <div className="mr-2 hidden md:inline w-full border border-red-300 text-sm shadow-lg font-medium rounded-sm shadow-sm text-red-300 bg-gray-900 whitespace-nowrap focus:outline-none">
        {account && (
          <span className="px-6 border-r border-red-300">
            {maticTokenBalance.toFixed(3)} MATIC
          </span>
        )}
        
        <button 
          onClick={(chainId !== 137 && !!account) ? () => switchToPolygon() : () => setOpen(true)}
          className="px-6 py-2 border-red-300 text-sm font-medium rounded-sm text-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >

            {(chainId !== 137) && "Switch to Polygon" }
            {(chainId === 137 && !account) && "Connect"}
            {(chainId === 137 && !!account) && shortenAddress(account)}
            
        </button>
      </div>
    </>
  );
}
