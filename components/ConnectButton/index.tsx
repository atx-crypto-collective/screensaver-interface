import React from "react";
import { useState } from "react";
import Modal from "../Modal";
import { useWeb3React } from "@web3-react/core";
import { shortenAddress } from "../../utils";
import { Web3Provider } from "@ethersproject/providers";
import { useEffect } from 'react'
import { POLYGON_MAINNET_PARAMS } from '../../constants'
import { injected } from '../../connectors'

export default function index() {
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    console.log("CHAIN ID", chainId)
  }, [account])

  return (
    <>
      <Modal status={"connect"} open={open} setOpen={setOpen} />

      <div className={'mr-2'}>
        <button 
          onClick={(chainId !== 137 && !!account) ? () => switchToPolygon() : () => setOpen(true)}
          className="px-6 w-full py-2 border border-red-300 text-sm rounded-full font-medium rounded-sm shadow-sm text-red-300 hover:text-black bg-gray-900 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          {(chainId !== 137 && !!account) ? "Switch to Polygon" : (!account ? "Connect" : shortenAddress(account))}
        </button>
      </div>
    </>
  );
}
