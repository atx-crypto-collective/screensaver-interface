import React from 'react'
import { Layout } from '../components'
import GalleryView from '../components/GalleryView'

const Home: React.VFC = () => {
  
  return (
    <Layout>
      <div className={'pb-8 w-full md:w-11/12 mx-auto'}>
        <GalleryView />
      </div>
    </Layout>
  )
}

export default Home

// import Head from 'next/head'
// import Link from 'next/link'
// import { Layout } from '../components'
// import Mint from '../components/Mint'
// import { Helmet } from 'react-helmet'

// export default function Home() {
//   return (
//     <Layout>
//       <div className={'w-11/12 max-w-2xl mx-auto py-6'}>
//         <h1 className={'text-2xl font-bold mb-3'}>Welcome to Screensaver</h1>
//         <p>
//           Screensaver is a NFT Marketplace built on Polygon Blockchain. Using
//           Polygon means extremely low minting and bidding fees ( ~ $0.002).
//           Polygon also uses POS which means it's a cleaner alternative to
//           minting on the ethereum mainnet.
//         </p>

//         <h1 className={'text-xl font-bold mt-6 mb-3'}>🎨 Explore</h1>

//         <Link href={'/gallery'}>
//           <a className="mt-4 w-full justify-center inline-flex items-center px-6 py-3 border border-red-300 shadow-sm text-red-300 font-medium rounded-xs text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
//             Explore
//           </a>
//         </Link>

//         <h1 className={'text-xl font-bold mt-6 mb-3'}>🍃 Minting</h1>

//         <Link href={'/mint'}>
//           <a className="mt-4 w-full justify-center inline-flex items-center px-6 py-3 border border-red-300 shadow-sm text-red-300 font-medium rounded-xs text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
//             Mint
//           </a>
//         </Link>
//         <h1 className={'text-xl font-bold mt-6 mb-3'}>💖 Community</h1>

//         <a
//           href={'https://discord.gg/fAGHysxKux'}
//           target={'_blank'}
//           className="mt-4 w-full justify-center inline-flex items-center px-6 py-3 border border-red-300 shadow-sm text-red-300 font-medium rounded-xs text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//         >
//           Discord
//         </a>

//         <h1 className={'text-xl font-bold mt-6 mb-3'}>Screensaver V0</h1>

//         <a
//           target={'_blank'}
//           href="https://v0.screensaver.world"
//           className="mt-4 w-full justify-center inline-flex items-center px-6 py-3 border border-red-300 shadow-sm text-red-300 font-medium rounded-xs text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//         >
//           Go to Screensaver V0
//         </a>
//       </div>
//     </Layout>
//   )
// }
