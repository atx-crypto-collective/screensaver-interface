import React from 'react'

interface IProps {
  // user: User
}

const NavigationLinks: React.VFC<IProps> = () => {
  return (
    <nav className={'flex flex-col'}>
      <div className={'flex flex-col space-y-4'}>
        <div className={'flex flex-col space-y-2 text-xl font-bold'}>
          <a href={'#'}>Explore</a>
          <a href={'#'}>Your Collection</a>
        </div>
        <div
          className={'flex flex-col space-y-1 text-gray-400 text-lg font-bold'}
        >
          <a href={'#'}>About</a>
          <a href={'#'}>Discord</a>
          <a href={'#'}>Instagram</a>
          <a href={'#'}>Twitter</a>
          <a href={'#'}>Medium</a>
        </div>
      </div>
    </nav>
  )
}

export default NavigationLinks
