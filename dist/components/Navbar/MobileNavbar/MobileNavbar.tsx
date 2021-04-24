// TODO: Cleanup and foramlize states
// TODO: Make Overlay take up full height of screen
// TODO: Properly handle login button placement code (current code is smelly)
// TODO: Properly color search box
import React, { useState } from 'react'
import { IProps } from '../types'
// TODO: figure out why inline require'ing these don't work (webpack issue?)
import logoImage from '../logo.svg'
import SearchInput from '../SearchInput'
import closeButtonIcon from './close-button-icon.svg'
import searchIcon from './search-icon.svg'
import menuIcon from './menu-icon.svg'
import NavigationLinks from './NavigationLinks'
import ConnectButton from '../../ConnectButton'
type State = 'initial' | 'search' | 'menu'

const MobileNavbar: React.FC<IProps> = () => {
  const [state, setState] = useState<State>('initial')

  return (
    <div className={'relative'}>
                  <ConnectButton />

      <div
        className={
          'flex justify-between mx-auto w-11/12 items-center h-12 z-10'
        }
      >
        <div className={'w-full'}>
          {['initial', 'menu'].includes(state) && (
            <><img
              src={logoImage}
              alt={'Lil Nifty Logo'}
              className={'cursor-pointer'}
              width={25}
              height={25}
            />
            <ConnectButton /></>

          )}

          {state === 'search' && (
            <div className={'flex space-x-4 w-full items-center'}>
              <img
                src={closeButtonIcon}
                alt={'Close'}
                className={'cursor-pointer'}
                onClick={() => setState('initial')}
              />
              <SearchInput placeholder={'Search...'} size={'small'} />
            </div>
          )}
        </div>
        <div className={'flex  items-center'}>
          {state === 'initial' && (
            <div
              className={'cursor-pointer'}
              onClick={() => {
                setState('search')
              }}
            >
              <img src={searchIcon} alt={'Search'} />
            </div>
          )}
          {['initial', 'menu'].includes(state) && (
            <div className={'cursor-pointer'}>
              {state === 'initial' && (
                <><img
                  src={menuIcon}
                  alt={'Menu'}
                  onClick={() => {
                    setState('menu')
                  }}
                />
                <ConnectButton /></>

              )}
              {state === 'menu' && (
                <img
                  src={closeButtonIcon}
                  alt={'Close'}
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
  )
}

export default MobileNavbar
