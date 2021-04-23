import React from 'react'
import { Meta } from '@storybook/react'

export const Regular = () => (
  <input className={'input w-96'} type={'text'} placeholder={'Enter text...'} />
)
export const Disabled = () => (
  <input className={'input w-96'} disabled placeholder={'Enter text...'} />
)
export const Unstyled = () => (
  <input className={'w-96'} type={'text'} placeholder={'Enter text...'} />
)

export default {
  title: 'Components/Inputs',
} as Meta
