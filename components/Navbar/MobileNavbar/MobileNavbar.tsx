// TODO: Cleanup and foramlize states
// TODO: Make Overlay take up full height of screen
// TODO: Properly handle login button placement code (current code is smelly)
// TODO: Properly color search box
import React, { useState } from 'react'
import Link from 'next/link'
import { IProps } from '../types'
import SearchInput from '../SearchInput'
import NavigationLinks from './NavigationLinks'
import { MenuIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/outline'
import ConnectButton from '../../ConnectButton'
import Banner from '../../Banner'
import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import logoImage from './SCREENSAVER.png'
import { ethers } from 'ethers'
import { ERC20_ABI } from '../../../constants/abis/erc20'
import { auth } from '../../../config/firebase'

var utils = require('ethers').utils

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

type State = 'initial' | 'search' | 'menu'

const tokenAddress = '0x580127f3F17516A945785b9485048ad22f036142'

const addToMetamask = async (provider: any): Promise<void> => {
  await provider.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: { address: tokenAddress, symbol: 'SSD', decimals: 18 },
    },
  })
}

const MobileNavbar: React.FC<IProps> = () => {
  const [state, setState] = useState<State>('initial')
  const [tokenBalance, setTokenBalance] = useState<number>(0)
  const { account, chainId, library, connector } = useWeb3React()
  const [isSignedIn, setIsSignedIn] = useState(false) // Local signed-in state.

  useEffect(() => {
    const unregisterAuthObserver = auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user)
      console.log('SIGN UP', user)
    })
    return () => unregisterAuthObserver()
  }, [])

  async function balanceOf() {
    const contract = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      library.getSigner(account),
    )

    var balance = await contract.balanceOf(account)
    var intBalance = utils.formatEther(balance)
    setTokenBalance(Number(intBalance))
  }

  useEffect(() => {
    if (!account) return
    balanceOf()
  }, [account])

  const track = async () => {
    // track is only called from a component that is only rendered once an
    // account is active, so we know connetor will be defined at that point
    const provider = await connector.getProvider()
    return addToMetamask(provider)
  }

  return (
    <div
      className={
        'fixed z-10 bg-black right-0 top-0 w-full border-b-2 border-gray-800'
      }
    >
      <div className={'mx-4'}>
        <div
          className={
            'flex justify-between mx-auto w-11/12 items-center h-16 z-10'
          }
        >
          <div className={'flex items-center'}>
          <Link href={'/gallery?page=1'}>
            <a className="flex font-serif text-2xl text-red-400 font-bold">
              <span className={'inline text-2xl mr-2'}>🌈</span>
              <img
                src={logoImage}
                alt={'Screen Saver'}
                className={'cursor-pointer'}
                width={200}
              />
            </a>
          </Link>

          <Link href={'/search'}>
          <input
            placeholder={'Search art titles...'}
            className={
              'input rounded-md border cursor-pointer border-gray-800 w-0 md:w-64 text-gray-400 font-bold text-base p-0 md:h-8 md:px-6 md:mx-10'
            }
          />
          </Link>
          </div>
          <div className={'flex space-x-3 items-center'}>
            {connector && (
              <div className="px-6 w-full py-2 border border-red-300 text-sm shadow-lg font-medium rounded-sm shadow-sm text-red-300 bg-gray-900 focus:outline-none ">
                {tokenBalance.toFixed(3)}{' '}
                <span
                  onClick={() => track()}
                  className="hover:underline cursor-pointer"
                >
                  SSD
                </span>
              </div>
            )}
            <ConnectButton />

            <Menu as="div" className="ml-3 relative z-20">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      {/* <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          /> */}
                      <MenuIcon
                        className={
                          ' text-red-300 h-8 w-8 p-2 border border-red-300 text-md font-medium rounded-sm shadow-lg hover:shadow-sm text-red-300 bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                        }
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="origin-top-right absolute right-0 mt-2 w-48 shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <Menu.Item>
                        <Link href="/gallery?page=1">
                          <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Gallery
                          </a>
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link href="/search">
                          <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Search
                          </a>
                        </Link>
                      </Menu.Item>
                      {!!account && (
                        <>
                          <Menu.Item>
                            <Link href={`/created/${account}`}>
                              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Created
                              </a>
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <Link href={`/owned/${account}`}>
                              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Owned
                              </a>
                            </Link>
                          </Menu.Item>
                        </>
                      )}
                      <Menu.Item>
                        <Link href="/mint">
                          <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Mint
                          </a>
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link href="/whitelist">
                          <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Whitelist
                          </a>
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link href="/">
                          <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            What is Screensaver Dao?
                          </a>
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link href="https://ssw.wtf/">
                          <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Account shortlinks
                          </a>
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <a
                          href="https://v0.screensaver.world"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Screensaver V0
                        </a>
                      </Menu.Item>

                      {isSignedIn && (
                        <Menu.Item>
                          <div
                            onClick={() => {
                              auth()
                                .signOut()
                                .then(() => {
                                  // Sign-out successful.
                                  console.log('SIGNOUT')
                                })
                                .catch((error) => {
                                  // An error happened.
                                  console.log('SIGNOUT ERROR', error)
                                })
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Admin Logout
                          </div>
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>

      <Banner />
    </div>
  )
}

export default MobileNavbar
