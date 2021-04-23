import React from 'react'
import { Meta } from '@storybook/react'

import { QuantitySelector } from '../../components'

export const Default = () => (
  <div className={'max-w-lg mx-auto'}>
    <QuantitySelector />
  </div>
)

export default {
  title: 'Components/QuantitySelector',
  component: QuantitySelector,
} as Meta
