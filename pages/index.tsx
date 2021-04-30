import Head from 'next/head'
import { Layout } from '../components'
import Mint from '../components/Mint'
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <Layout > 
      <div className={'w-11/12 max-w-2xl mx-auto py-6'}>
        <h1 className={'text-2xl font-bold mb-3'}>Welcome to Screensaver.world Dao</h1>
        <p>
          Screensaver.world Dao is the first NFT Marketplace Dao built on Polygon Layer 2. Using Polygon means extremely low minting and bidding fees ( ~ $0.0002) and PoS so no terrible environmental destruction. Screensaver.world is an entirerly open marketplace and takes a very small fee of 2.5%. Royalties for all artists are set to 15%. 
        </p>
          <h1 className={'text-xl font-bold my-3'}>Governance</h1>
        <p>
        A governance token will be distributed to users based on their activity in the marketplace. We are figuring out the best algorithm to use for this so - stay tuned.        </p>
        <h1 className={'text-xl font-bold mt-6 mb-3'}>Gallery</h1>

        <a href={'/gallery'}
              target={'_blank'}
              // className="ml-6 inline-flex items-center px-4 py-2 border border-red-300 text-xs rounded-full font-medium rounded-sm shadow-sm text-red-300 bg-gray-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"

              className="mt-4 w-full justify-center inline-flex items-center px-6 py-3 border border-red-300 shadow-sm text-red-300 font-medium rounded-xs text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
         
            >
              Gallery
              </a>

        <h1 className={'text-xl font-bold mt-6 mb-3'}>Minting</h1>

        <a href={'/mint'}
              // className="ml-6 inline-flex items-center px-4 py-2 border border-red-300 text-xs rounded-full font-medium rounded-sm shadow-sm text-red-300 bg-gray-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"

              className="mt-4 w-full justify-center inline-flex items-center px-6 py-3 border border-red-300 shadow-sm text-red-300 font-medium rounded-xs text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
         
              // onClick={() => setOpen(true)}
            >
              Mint
              </a>
              <h1 className={'text-xl font-bold mt-6 mb-3'}>Community</h1>

              <a href={'https://discord.gg/fAGHysxKux'}
              target={'_blank'}
              // className="ml-6 inline-flex items-center px-4 py-2 border border-red-300 text-xs rounded-full font-medium rounded-sm shadow-sm text-red-300 bg-gray-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"

              className="mt-4 w-full justify-center inline-flex items-center px-6 py-3 border border-red-300 shadow-sm text-red-300 font-medium rounded-xs text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
         
            >
              Discord
              </a>

      </div>
    </Layout>
  )
}
