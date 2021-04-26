import React, { useState } from 'react'
import { Navbar } from '.'
import Modal from './Modal'
import { useWeb3React } from "@web3-react/core";
import { useEffect } from 'react'

const Layout: React.FC = ({ children }) => {
  const [open, setOpen] = useState(true)
  const { account, chainId } = useWeb3React();

  useEffect(() => {
    console.log("CHAIN ID", chainId)
  }, [account])

  return (
    <div className={'space-y-4 lg:pb-20 bg-black h-full'}>
      { chainId !== 137 && <div className={'mt-20'} /> }
      <div className={'mt-8'} />
      <Navbar />
      <div>{children}</div>
    </div>
  )
}

export default Layout
