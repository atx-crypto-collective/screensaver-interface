// TODO: Lazy image loading?
import React from 'react'

export interface IProps {
  srcUrl: string
  altText: string
  footer?: React.ReactElement
}

const ImageCard: React.FC<IProps> = ({ srcUrl, altText, footer, children }) => {
  return (
    <div
      className={
        'border-white border-solid border-2 border-gray-700 max-w-sm rounded-2xl text-white'
      }
    >
      <div className={'flex flex-col mx-auto'}>
        <div
          className={'flex flex-col w-full mx-auto space-y-3'}
        >
          <div className={'rounded-t-2xl overflow-hidden'}>
            <img src={srcUrl} alt={altText} />
          </div>
          {children && <div>{children}</div>}
        </div>
      </div>
      {footer && (
        <>
          <div
            className={
              'mt-5 mb-3'
            }
          />
          <div className={'mx-auto w-full'}>
            {footer}
          </div>
        </>
      )}
    </div>
  )
}

export default ImageCard
