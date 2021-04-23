import React from 'react'
import { Meta } from '@storybook/react'
import NFTItemQuickView from '../../components/NFTItemQuickView'

export const Empty = () => (
  <NFTItemQuickView
    name={'Lil Nifty Early Adopter Token'}
    coverImageSrc={
      'https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/images%2FIMG_8385.jpeg?alt=media&token=6a96e213-8a67-4a66-bb90-6a1ef5013015'
    }
    creator={{
      avatarSrc: 'https://randomuser.me/api/portraits/women/26.jpg',
      name: 'elenaflores',
    }}
  />
)

// TODO: Create real component
export const PayoutHistory = () => (
  <NFTItemQuickView
    name={'Lil Nifty Early Adopter Token'}
    coverImageSrc={
      'https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/images%2FIMG_8385.jpeg?alt=media&token=6a96e213-8a67-4a66-bb90-6a1ef5013015'
    }
    creator={{
      avatarSrc: 'https://randomuser.me/api/portraits/women/26.jpg',
      name: 'elenaflores',
    }}
  >
    <div className={'flex flex-col text-xs pb-1 space-y-1'}>
      <div>$50.60</div>
      <div>100 collected</div>
      <div className={'font-light'}>02.07.21</div>
    </div>
  </NFTItemQuickView>
)

// TODO: Create real component
export const CheckoutItemDetail = () => (
  <NFTItemQuickView
    name={'Lil Nifty Early Adopter Token'}
    coverImageSrc={
      'https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/images%2FIMG_8385.jpeg?alt=media&token=6a96e213-8a67-4a66-bb90-6a1ef5013015'
    }
    creator={{
      avatarSrc: 'https://randomuser.me/api/portraits/women/26.jpg',
      name: 'elenaflores',
    }}
  >
    <div className={'flex flex-col text-xs pb-1 space-y-1'}>
      <div className={'font-medium text-xs'}>$5 per edition</div>
      <div className={'text-xs'}>100 collected</div>
      <div className={'font-medium text-sm'}>20hrs 10m 2s</div>
    </div>
  </NFTItemQuickView>
)

export default {
  title: 'Components/NFT Item Quick View',
  component: NFTItemQuickView,
} as Meta
