import React from 'react'

interface IProps {}

const NavigationLinks: React.VFC<IProps> = () => {
  return (
    <nav className={'flex space-x-4 text-xl items-center'}>
      <a href={'#'} className={'font-medium'}>
        Explore
      </a>
      {true && (
        <a href={''} className={'font-bold'}>
          Your Collection
        </a>
      )}
      <a href={'#'} className={'font-medium'}>
        About
      </a>
    </nav>
  )
}

export default NavigationLinks
