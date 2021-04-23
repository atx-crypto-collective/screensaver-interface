import React from 'react'
import { Meta } from '@storybook/react'
import NFTItemCard from '../../components/NFTItemCard'
import { IProps } from '../../components/NFTItemCard/types'

export const Active: React.VFC<IProps> = () => (
  <NFTItemCard
    title={'Bong Dog'}
    coverImageSrc={
      'https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/images%2FIMG_8385.jpeg?alt=media&token=6a96e213-8a67-4a66-bb90-6a1ef5013015'
    }
    creator={{
      avatarImageSrc: 'https://randomuser.me/api/portraits/women/26.jpg',
      name: 'elenaflores',
    }}
    endDateTime={new Date('1/1/2100')}
    amountCollected={100}
  />
)

export const Expired: React.VFC<IProps> = () => (
  <NFTItemCard
    title={'Bong Dog'}
    coverImageSrc={
      'https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/images%2FIMG_8385.jpeg?alt=media&token=6a96e213-8a67-4a66-bb90-6a1ef5013015'
    }
    creator={{
      avatarImageSrc: 'https://randomuser.me/api/portraits/women/26.jpg',
      name: 'elenaflores',
    }}
    endDateTime={new Date('1/1/2019')}
    amountCollected={100}
  />
)

export default {
  title: 'Components/NFT Item Card',
  component: NFTItemCard,
} as Meta
