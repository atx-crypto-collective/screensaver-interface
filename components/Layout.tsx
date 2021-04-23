import React, { useState } from 'react'
import { Navbar } from '.'
import Modal from './Modal'

const Layout: React.FC = ({ children }) => {
  const [open, setOpen] = useState(true)

  return (
    <div className={'space-y-4 lg:pb-20 bg-black'}>
      <Navbar />
      <Modal open={open} setOpen={setOpen} connect={true} />
      <div>{children}</div>
    </div>
  )
}

export default Layout
