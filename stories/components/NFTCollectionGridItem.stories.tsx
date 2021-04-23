import React from 'react'
import { Meta } from '@storybook/react'
import NFTCollectionGridItem from '../../components/NFTCollectionGridItem'

export const ZeroCollected: React.FC = () => (
  <div className={'max-w-lg mx-auto'}>
    <NFTCollectionGridItem
      coverPhotoImageSrc={
        'https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/images%2FIMG_8385.jpeg?alt=media&token=6a96e213-8a67-4a66-bb90-6a1ef5013015'
      }
      amountCollected={0}
      creator={{
        avatarImageSrc: 'https://randomuser.me/api/portraits/women/26.jpg',
        username: 'username',
      }}
    />
  </div>
)

export const MultipleCollected: React.FC = () => (
  <div className={'max-w-lg mx-auto'}>
    <NFTCollectionGridItem
      coverPhotoImageSrc={
        'https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/images%2FIMG_8385.jpeg?alt=media&token=6a96e213-8a67-4a66-bb90-6a1ef5013015'
      }
      amountCollected={100}
      creator={{
        avatarImageSrc: 'https://randomuser.me/api/portraits/women/26.jpg',
        username: 'username',
      }}
    />
  </div>
)

export default {
  title: 'Components/NFT Collection Grid Item',
  component: NFTCollectionGridItem,
} as Meta
