import React from 'react'
import { Meta } from '@storybook/react'
import ImageWithActions, {
  ActionButton,
} from '../../components/ImageWithActions'

export const Generic: React.FC = () => (
  <div className={'max-w-lg mx-auto'}>
    <ImageWithActions
      src={
        'https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/images%2FIMG_8385.jpeg?alt=media&token=6a96e213-8a67-4a66-bb90-6a1ef5013015'
      }
      actions={[
        <ActionButton
          size={'large'}
          className={
            'bg-white border-2 border-solid border-yellow-700 text-xs sm:text-lg cursor-pointer'
          }
        >
          1
        </ActionButton>,
        <ActionButton
          size={'large'}
          className={
            'border-2 border-solid bg-white border-purple-500 cursor-pointer text-xs sm:text-lg'
          }
        >
          2
        </ActionButton>,
      ]}
    />
  </div>
)

export default {
  title: 'Components/ImageWithActions',
  component: ImageWithActions,
} as Meta
