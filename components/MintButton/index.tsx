import React from "react";
import { useState } from "react";
import Modal from "../Modal";
import { useWeb3React } from "@web3-react/core";
import { shortenAddress } from "../../utils";
import { Web3Provider } from "@ethersproject/providers";
import { useEffect } from 'react'
import { POLYGON_MAINNET_PARAMS } from '../../constants'
import { ethers } from 'ethers'
import { GALLERY_ABI } from '../../constants/gallery'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { LibraryIcon } from "@heroicons/react/outline";
var utils = require('ethers').utils;

interface IProps {
    hash: string
}

const index: React.FC<IProps> = ({hash}) => {
  const [open, setOpen] = useState(false);

  const {
    chainId,
    account,
    library
  } = useWeb3React<Web3Provider>()

  async function createToken(uri: string) {
    const contract = new ethers.Contract(    
      process.env.NEXT_PUBLIC_CONTRACT_ID,
      GALLERY_ABI,
      library.getSigner(account),
    )

    await contract.createToken(uri)
    console.log("URI", uri)
  }


  useEffect(() => {
    console.log("CHAIN ID", chainId)
  }, [account])

  return (
    <>
      <Modal status={chainId !== 137 ? "switch-network" : "connect"} open={open} setOpen={setOpen} />

      <div className={'mr-2'}>
        <button 
          onClick={(!account || chainId !== 137) ? () => setOpen(true) : () => createToken(`https://ipfs.io/ipfs/${hash}`)}
          className="px-6 w-full py-2 border border-red-300 text-sm rounded-full font-medium rounded-sm shadow-sm text-red-300 hover:text-black bg-gray-900 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
            Mint this NFT
        </button>
      </div>
    </>
  );
}


export default index
