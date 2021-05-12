import React, { useState } from 'react'
import { Navbar } from '.'
import Modal from './Modal'
import { useWeb3React } from "@web3-react/core";
import { useEffect } from 'react'
import NFT from '../types'
import Head from 'next/head';

interface IProps {
  url?: string
  image?: string
  metadata?: NFT
}

const Layout: React.FC<IProps> = ({ children, metadata, image, url }) => {
  const [open, setOpen] = useState(false)
  const { account, chainId } = useWeb3React();

  useEffect(() => {
    console.log("CHAIN ID", chainId)
  }, [account])
  
  return (
    <div 
    className={'mt-32 pace-y-4 lg:pb-20 bg-black h-full'}
    >
        <Head>
          {/* Twitter */}
          {/* <meta name="twitter:card" content="summary" key="twcard" />
          <meta name="twitter:creator" content={'@screensaverdao'} key="twhandle" /> */}

          {/* Open Graph */}
          <meta property="og:url" content={url} key="ogurl" />
          <meta property="og:image" content={image} key="ogimage" />
          <meta property="og:site_name" content={'Screensaver Dao'} key="ogsitename" />
          <meta property="og:title" content={'Screensaver'} key="ogtitle" />
          <meta property="og:description" content={metadata.description} key="ogdesc" />
        </Head>
      <Navbar />
      <div>{children}</div>
    </div>
  )
}

export default Layout
