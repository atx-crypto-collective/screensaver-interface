import React from "react";
import { useState, useEffect } from "react";
import Modal from "../Modal";
import { useWeb3React } from "@web3-react/core";
import { shortenAddress } from "../../utils";
import { Web3Provider } from "@ethersproject/providers";
import { useMaticBalance } from '../../hooks/useMaticBalance';
import { POLYGON_MAINNET_PARAMS } from '../../constants'
import { injected } from '../../connectors'

export default function index() {
  const [open, setOpen] = useState(false);
  const maticBalance = useMaticBalance();

  const {
    chainId,
    account,
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
  return (
    <>
      <Modal status={"connect"} open={open} setOpen={setOpen} />

      <div className="mr-2 max-w-32 border border-red-300 text-sm shadow-lg font-medium rounded-sm text-red-300 bg-gray-900 whitespace-nowrap focus:outline-none">
        {account && (
          <span className="px-6 border-r border-red-300">
            {maticBalance.toFixed(3)} MATIC
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
