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
        'border-white border-solid border border-opacity-25 max-w-sm rounded-2xl text-white py-4'
      }
    >
      <div className={'flex flex-col mx-auto'}>
        <div
          className={'flex flex-col w-full mx-auto space-y-3'}
          style={{ maxWidth: '92.8%' }}
        >
          <div className={'rounded-2xl overflow-hidden'}>
            <img src={srcUrl} alt={altText} />
          </div>
          {children && <div>{children}</div>}
        </div>
      </div>
      {footer && (
        <>
          <hr
            className={
              'mt-5 mb-3 mx-1 border-b border-white border-opacity-25 border-t-0'
            }
          />
          <div className={'mx-auto w-full'} style={{ maxWidth: '92.8%' }}>
            {footer}
          </div>
        </>
      )}
    </div>
  )
}

export default ImageCard
