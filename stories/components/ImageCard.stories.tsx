import React from 'react'
import { Meta } from '@storybook/react'
import ImageCard from '../../components/ImageCard'

export const WithoutFooter: React.FC = () => (
  <ImageCard
    srcUrl={
      'https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/images%2FIMG_8385.jpeg?alt=media&token=6a96e213-8a67-4a66-bb90-6a1ef5013015'
    }
    altText={''}
  />
)

export const WithoutFooterAndWithContents: React.FC = () => (
  <ImageCard
    srcUrl={
      'https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/images%2FIMG_8385.jpeg?alt=media&token=6a96e213-8a67-4a66-bb90-6a1ef5013015'
    }
    altText={''}
  >
    <div>Contents</div>
  </ImageCard>
)

export const WithFooter: React.FC = () => (
  <ImageCard
    srcUrl={
      'https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/images%2FIMG_8385.jpeg?alt=media&token=6a96e213-8a67-4a66-bb90-6a1ef5013015'
    }
    altText={''}
    footer={<div>Footer</div>}
  />
)

export const WithFooterWithContents: React.FC = () => (
  <ImageCard
    srcUrl={
      'https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/images%2FIMG_8385.jpeg?alt=media&token=6a96e213-8a67-4a66-bb90-6a1ef5013015'
    }
    altText={''}
    footer={<div>Footer</div>}
  >
    <div>Contents</div>
  </ImageCard>
)

export default {
  title: 'Components/Image Card',
  component: ImageCard,
} as Meta
