import React from 'react'
import { IProps } from '../types'
import SearchInput from '../SearchInput'

// TODO: `require` images inline
// import logoImage from '../logo.svg'
import SocialMediaBar from './SocialMediaBar'
import NavigationLinks from './NavigationLinks'

const DesktopNavbar: React.FC<IProps> = () => {
  return (
    <div
      className={'py-3 px-2 flex items-center justify-between text-gray-400'}
    >
      <div className={'flex items-center space-x-6 w-1/2'}>
        <div>
          {/* <img src={logoImage} width={52} height={52} alt={'Logo'} /> */}
        </div>
        <div className={'w-full max-w-md'}>
          <SearchInput
            placeholder={'Search NFTs, Collections, and Usernames'}
            size={'large'}
          />
        </div>
      </div>
      <div className={'flex items-center space-x-12 flex-shrink'}>
        <div>
          <NavigationLinks />
        </div>
        <div>
          <SocialMediaBar />
        </div>
        {true && (
          <div>
            <button>Login</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DesktopNavbar
