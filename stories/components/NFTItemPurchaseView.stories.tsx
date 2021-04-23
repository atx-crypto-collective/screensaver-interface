import React from 'react'
import { Meta } from '@storybook/react'

import { NFTItemPurchaseView } from '../../components'

export const Default = () => (
  <div className={'max-w-lg mx-auto'}>
    <NFTItemPurchaseView />
  </div>
)

export default {
  title: 'Components/NFTItemPurchaseView',
  component: NFTItemPurchaseView,
} as Meta
