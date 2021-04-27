import React from 'react'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'
import { IProps } from './types'

const Navbar: React.VFC<IProps> = () => {
  return (
    <div>
      {/* <div className={'xl:hidden'}> */}
        <MobileNavbar />
      {/* </div>
      <div className={'hidden xl:block'}>
        <DesktopNavbar />
      </div> */}
    </div>
  )
}

export default Navbar
