import React from "react";
import { useState } from "react";
import Modal from "../Modal";
import { useWeb3React } from "@web3-react/core";
import { shortenAddress } from "../../utils";
import { Web3Provider } from "@ethersproject/providers";

export default function index() {
  const [open, setOpen] = useState(false);

  const { account } = useWeb3React<Web3Provider>();

  return (
    <>
      <Modal open={open} setOpen={setOpen} />

      <div>
        <button
          onClick={() => setOpen(true)}
          className="ml-6 inline-flex items-center px-4 py-2 border border-red-300 text-xs rounded-full font-medium rounded-sm shadow-sm text-red-300 bg-gray-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {!account ? "Connect" : shortenAddress(account)}
        </button>
      </div>
    </>
  );
}
