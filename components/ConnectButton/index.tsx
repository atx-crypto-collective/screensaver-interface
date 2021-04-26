import React from "react";
import { useState } from "react";
import Modal from "../Modal";
import { useWeb3React } from "@web3-react/core";
import { shortenAddress } from "../../utils";
import { Web3Provider } from "@ethersproject/providers";
import { useEffect } from 'react'

export default function index() {
  const [open, setOpen] = useState(false);

  const { account, chainId } = useWeb3React();

  useEffect(() => {
    console.log("CHAIN ID", chainId)
  }, [account])

  return (
    <>
      <Modal status={"status"} open={open} setOpen={setOpen} />

      <div>
        <button 
          onClick={() => setOpen(true)}
          className="ml-6 inline-flex items-center px-6 py-2 border border-red-300 text-sm rounded-full font-medium rounded-sm shadow-sm text-red-300 hover:text-black bg-gray-900 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          {!account ? "Connect" : shortenAddress(account)}
        </button>
      </div>
    </>
  );
}
