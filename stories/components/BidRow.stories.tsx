import React from 'react'
import { Meta } from '@storybook/react'
import BidRow from '../../components/BidRow'

export const Default = () => (
    <div className={'max-w-xl mx-auto'}>
      {/* <BidRow owner={true} /> */}
    </div>
  )
  
  export default {
    title: 'Components/BidRow',
    component: BidRow,
  } as Meta
  