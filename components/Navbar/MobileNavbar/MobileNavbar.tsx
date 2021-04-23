// TODO: Cleanup and foramlize states
// TODO: Make Overlay take up full height of screen
// TODO: Properly handle login button placement code (current code is smelly)
// TODO: Properly color search box
import React, { useState } from 'react'
import { IProps } from '../types'
// TODO: figure out why inline require'ing these don't work (webpack issue?)
import logoImage from '../REDPILL.svg'
import SearchInput from '../SearchInput'
// import closeButtonIcon from './close-button-icon.svg'
// import searchIcon from './search-icon.svg'
// import menuIcon from './menu-icon.svg'
import NavigationLinks from './NavigationLinks'
import { MenuIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/outline'
type State = 'initial' | 'search' | 'menu'

const MobileNavbar: React.FC<IProps> = () => {
  const [state, setState] = useState<State>('initial')

  return (
    <div className={'relative'}>
      <div
        className={
          'flex justify-between mx-auto w-11/12 items-center h-12 z-10'
        }
      >
        <div className={'w-full'}>
          {['initial', 'menu'].includes(state) && (
            <img
              src={logoImage}
              alt={'Lil Nifty Logo'}
              className={'cursor-pointer'}
              width={100}
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
                className={'h-5 w-5 text-white'}
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
  )
}

export default MobileNavbar
