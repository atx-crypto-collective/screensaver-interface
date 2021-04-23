import React from 'react'
import { Meta } from '@storybook/react'

import { TransferView } from '../../components'

export const Default = () => (
  <div className={'max-w-md mx-auto'}>
    <TransferView
      collectedNFTItem={{
        title: 'Rare Digital Art Piece',
        availableToTransfer: 5,
      }}
    />
  </div>
)

export default {
  title: 'Components/TransferView',
  component: TransferView,
} as Meta
