import { FaTwitter, FaDiscord } from 'react-icons/fa'

/* This example requires Tailwind CSS v2.0+ */
export default function Header() {
  return (
    <div className="md:py-24">
      <div className="max-w-3xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Welcome to Screensaver.world!</span>
          {/* <span className="block">SSW is community first and open source NFT protocol on Polygon.</span> */}
        </h2>
        <p className="mt-4 px-10 text-lg leading-6 text-gray-200">
          We are an intergalatic consortium of humans and robots working to
          decentralize NFTs and provide a greater future for artists across the
          universe.
        </p>
        <div className={'inline-flex space-x-4'}>
          <a
            href="https://discord.gg/fAGHysxKux"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-gray-200 text-gray-200 text-base font-medium rounded-md hover:bg-indigo-50 hover:text-indigo-400 sm:w-auto"
          >
            <FaDiscord className="mr-2" /> Discord
          </a>
          <a
            href="https://twitter.com/screensavernft"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-gray-200 text-gray-200 text-base font-medium rounded-md hover:bg-indigo-50 hover:text-indigo-400 sm:w-auto"
          >
            <FaTwitter className="mr-2" /> Twitter
          </a>
        </div>
      </div>
    </div>
  )
}
