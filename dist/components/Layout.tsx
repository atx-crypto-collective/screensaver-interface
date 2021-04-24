import React from 'react'
import { Navbar } from '.'

const Layout: React.FC = ({ children }) => {
  return (
    <div className={'bg-black h-screen w-screen'}>
      <Navbar />
      <div>{children}</div>
    </div>
  )
}

export default Layout
