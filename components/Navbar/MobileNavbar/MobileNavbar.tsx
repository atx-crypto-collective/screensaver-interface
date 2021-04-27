// TODO: Cleanup and foramlize states
// TODO: Make Overlay take up full height of screen
// TODO: Properly handle login button placement code (current code is smelly)
// TODO: Properly color search box
import React, { useState } from 'react'
import { IProps } from '../types'
// TODO: figure out why inline require'ing these don't work (webpack issue?)
// import logoImage from './REDPILL.svg'
import SearchInput from '../SearchInput'
// import closeButtonIcon from './close-button-icon.svg'
// import searchIcon from './search-icon.svg'
// import menuIcon from './menu-icon.svg'
import NavigationLinks from './NavigationLinks'
import { MenuIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/outline'
import ConnectButton from '../../ConnectButton'
import Banner from '../../Banner'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import logoImage from "./redpill.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

type State = 'initial' | 'search' | 'menu'

const MobileNavbar: React.FC<IProps> = () => {
  const [state, setState] = useState<State>('initial')
  const { account, chainId } = useWeb3React()

  return (
    <div
      className={
        'fixed z-10 bg-black right-0 top-0 w-full border-b-2 border-gray-800'
      }
    >
      <div className={'mx-4'}>
        <div
          className={
            'flex justify-between mx-auto w-11/12 items-center h-14 z-10'
          }
        >
          <div className={'flex'}>
            <span className={'inline text-2xl mr-2'}>💊</span>
              <img
                src={logoImage}
                alt={'Lil Nifty Logo'}
                className={'cursor-pointer'}
                width={80}
              />
          </div>          
          <div className={'flex space-x-3 items-center'}>
            <ConnectButton />
            
            {/* {state === 'initial' && (
              <div
                className={'cursor-pointer ml-2'}
                onClick={() => {
                  setState('search')
                }}
              ></div>
            )} */}
            {/* {['initial', 'menu'].includes(state) && (
            <div className={'cursor-pointer'}>
              {state === 'initial' && (
                <MenuIcon

                className={' text-red-300 p-2 border border-red-300 text-md rounded-full font-medium rounded-sm shadow-sm text-red-300 hover:text-black bg-gray-900 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'}
                  onClick={() => {
                    setState('menu')
                  }}
                />
              )}
              {state === 'menu' && (
                <XIcon
                className={'h-5 w-5 text-white '}

                  onClick={() => {
                    setState('initial')
                  }}
                />
              )}
            </div>
          )} */}
            <Menu as="div" className="ml-3 relative">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      {/* <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          /> */}
                      <MenuIcon
                        className={
                          ' text-red-300 h-8 w-8 p-2 border border-red-300 text-md rounded-full font-medium rounded-sm shadow-sm text-red-300 hover:text-black bg-gray-900 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
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
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            Explore
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/mint"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            Mint
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            Your Collection
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </div>
        {/* {state === 'menu' && (
          <div
            className={
              'absolute left-0 bg-black border-t-2 border-white border-opacity-10 w-full z-10 text-white py-6 overflow-scroll'
            }
          >
            <div style={{ maxWidth: '80%' }} className={'mx-auto w-screen'}>
            <NavigationLinks />
            </div>
            <div
            className={
              'py-6 mt-12 border-t border-white border-opacity-10 w-full text-center'
            }
          >
            <button>Login</button>
          </div>
          </div>
        )} */}
      </div>

      {/* {chainId !== 137 && account && <Banner />} */}
    </div>
  )
}

export default MobileNavbar
