import React from 'react'
import ActionButton from './ActionButton'

interface IProps {
  src: string
  alt?: string
  actions: typeof ActionButton[] // TODO: Fix this typing which is throwing errors
}

const ImageWithActions: React.FC<IProps> = ({ src, alt, actions }) => {
  return (
    <div className={'relative'}>
      <img src={src} alt={alt} className={'object-fill'} />
      <div className={'absolute top-2 right-2 flex space-x-1 z-0'}>{actions}</div>
    </div>
  )
}

export default ImageWithActions
