// TODO: Cleanup and foramlize states
// TODO: Make Overlay take up full height of screen
// TODO: Properly handle login button placement code (current code is smelly)
// TODO: Properly color search box
import React, { useState } from 'react'
import { IProps } from '../types'
// TODO: figure out why inline require'ing these don't work (webpack issue?)
// import logoImage from '/REDPILL.svg'
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
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useEffect } from 'react'

type State = 'initial' | 'search' | 'menu'

const MobileNavbar: React.FC<IProps> = () => {
  const [state, setState] = useState<State>('initial')
  const { account, chainId } = useWeb3React();

  return (
    <div className={'fixed bg-black right-0 top-0 w-full border-b-2 border-gray-800'} >
    <div className={'mx-4'}>
      <div
        className={
          'flex justify-between mx-auto w-11/12 items-center h-14 z-10'
        }
      >
        <span className={"inline text-2xl"}>💊</span>
        <div className={'w-full ml-2'}>
          {['initial', 'menu'].includes(state) && (
            <img
              src={'/REDPILL.svg'}
              alt={'Lil Nifty Logo'}
              className={'cursor-pointer'}
              width={80}
            />
          )}

          {state === 'search' && (
            <div className={'flex space-x-4 w-full items-center'}>
              <XIcon
                className={'cursor-pointer'}
                onClick={() => setState('initial')}
                color={'white'}
              />
              <SearchInput placeholder={'Search...'} size={'small'} />
            </div>
          )}
        </div>
        <ConnectButton />
        <div className={'flex space-x-3 items-center'}>
          {state === 'initial' && (
            <div
              className={'cursor-pointer'}
              onClick={() => {
                setState('search')
              }}
            >
              {/* <SearchIcon className={'h-5 w-5 text-white'}/> */}
            </div>
          )}
          {['initial', 'menu'].includes(state) && (
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
                className={'h-5 w-5 text-white'}

                  onClick={() => {
                    setState('initial')
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
      {state === 'menu' && (
        <div
          className={
            'absolute bg-black border-t-2 border-white border-opacity-10 w-full z-10 text-white py-6 overflow-scroll'
          }
        >
          {/** Main Menu */}
          <div style={{ maxWidth: '81.1%' }} className={'mx-auto'}>
            <NavigationLinks />
          </div>
          <div
            className={
              'py-6 mt-12 border-t border-white border-opacity-10 w-full text-center'
            }
          >
            <button>Login</button>
          </div>
          {/** ./ Main Menu */}
        </div>
      )}
    </div>

    { chainId !== 137 &&  <Banner />}
         
          </div>

  )
}

export default MobileNavbar
