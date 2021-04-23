import React from 'react'
import { Meta } from '@storybook/react'
import Mint from '../../components/Mint'

export const Default = () => (
    <div className={'max-w-xl mx-auto'}>
      <Mint />
    </div>
  )
  
  export default {
    title: 'Components/Mint',
    component: Mint,
  } as Meta
  