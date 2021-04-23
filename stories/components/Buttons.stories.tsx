import React from 'react'
import { Meta } from '@storybook/react'
import { CogIcon } from '@heroicons/react/solid'

export const Basic: React.FC = () => <button className={'button'}>Click</button>

export const Gradient: React.FC = () => (
  <button className={'button button--gradient'}>Click</button>
)

export const GradientDisabled: React.FC = () => (
  <button className={'button button--gradient'} disabled>
    Click
  </button>
)

export const Icon: React.FC = () => (
  <button className={'icon-button'}>
    <CogIcon className={'w-5 h-5'} />
  </button>
)

export default {
  title: 'Components/Buttons',
} as Meta
