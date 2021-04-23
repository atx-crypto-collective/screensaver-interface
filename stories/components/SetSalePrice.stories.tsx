import React from 'react'
import { Meta } from '@storybook/react'
import SetSalePrice from '../../components/SetSalePrice'

export const Default = () => (
    <div className={'max-w-xl mx-auto'}>
      <SetSalePrice sale={true}/>
    </div>
  )
  
  export default {
    title: 'Components/SetSalePrice',
    component: SetSalePrice,
  } as Meta
  