import React, { useState } from 'react'
import { Navbar } from '.'
import Modal from './Modal'
import { useWeb3React } from "@web3-react/core";
import { useEffect } from 'react'
import classNames from 'classnames'
import Head from 'next/head';

interface IProps {
  url?: string
  image?: string 
}

const Layout: React.FC<IProps> = ({ children, url, image }) => {
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
          <meta name="twitter:card" content="summary_large_image" key="twcard" />
          <meta name="twitter:creator" content={'@screensaverdao'} key="twhandle" />

          {/* Open Graph */}
          <meta property="og:url" content={url} key="ogurl" />
          <meta property="og:image" content={image} key="ogimage" />
          <meta property="og:site_name" content={'Screensaver Dao'} key="ogsitename" />
          <meta property="og:title" content={'Screensaver'} key="ogtitle" />
          <meta property="og:description" content={'Screensaver Dao Auction'} key="ogdesc" />
        </Head>
      <Navbar />
      <div>{children}</div>
    </div>
  )
}

export default Layout
