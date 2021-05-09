import React, { useState } from 'react'
import { Navbar } from '.'
import Modal from './Modal'
import { useWeb3React } from "@web3-react/core";
import { useEffect } from 'react'
import classNames from 'classnames'
import { url } from 'node:inspector';

const Layout: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false)
  const { account, chainId } = useWeb3React();

  useEffect(() => {
    console.log("CHAIN ID", chainId)
  }, [account])
  
  return (
    <div 
    className={'mt-32 space-y-4 lg:pb-20 bg-black h-full'}
    >
        <div className="animate-roll absolute ">
    <img src={require('../assets/elon.png')} className={'w-40 h-50'}/>
  </div>
      <Navbar />
      <div>{children}</div>
    </div>
  )
}

export default Layout
