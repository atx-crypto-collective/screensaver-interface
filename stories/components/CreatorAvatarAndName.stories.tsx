import React from 'react'
import { Meta } from '@storybook/react'
import CreatorAvatarAndName from '../../components/CreatorAvatarAndName'

export const Basic = () => (
  <CreatorAvatarAndName
    avatarSrc={'https://randomuser.me/api/portraits/women/26.jpg'}
    name={'elenaflores'}
  />
)

export const Bold = () => (
  <CreatorAvatarAndName
    avatarSrc={'https://randomuser.me/api/portraits/women/26.jpg'}
    name={'elenaflores'}
    bold
  />
)

export const Gray = () => (
  <CreatorAvatarAndName
    avatarSrc={'https://randomuser.me/api/portraits/women/26.jpg'}
    name={'elenaflores'}
    gray
  />
)

export const GrayAndBold = () => (
  <CreatorAvatarAndName
    avatarSrc={'https://randomuser.me/api/portraits/women/26.jpg'}
    name={'elenaflores'}
    gray
    bold
  />
)

export default {
  title: 'Components/Creator Avatar and Name',
  component: CreatorAvatarAndName,
} as Meta
