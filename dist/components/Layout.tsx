import React from 'react'
import { Navbar } from '.'

const Layout: React.FC = ({ children }) => {
  return (
    <div className={'space-y-4 lg:pb-20'}>
      <Navbar />
      <div>{children}</div>
    </div>
  )
}

export default Layout
