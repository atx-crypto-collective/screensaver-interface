// TODO: Lazy image loading?
import React from 'react'
import NFT from '../types'

// export interface IProps {
//   nft?: NFT
//   srcUrl?: string
//   altText: string
//   footer?: React.ReactElement
// }

const ImageCard  = ({ srcUrl, nft, altText, footer, children }) => {
  return (
    <div
      className={
        'border-white border-solid border border-gray-800 shadow-white max-w-sm text-white rounded-2xl '
      }
    >
      <div className={'flex flex-col mx-auto'}>
        <div
          className={'flex flex-col w-full mx-auto space-y-3'}
        >
          <div className={'rounded-t-2xl overflow-hidden h-96'}>
            { !!nft?.image ? 
            <img src={nft.image} alt={altText} />
            :
            <model-viewer
              style={{width: '100%', height: '100%'}}
              id={nft?.tokenId}
              alt={nft?.name + nft?.tokenId}
              src={nft?.animation_url}
              auto-rotate
              camera-controls
              ar
              ar-modes="quick-look"
              ar-scale="auto"
              // ios-src={}
            />
            }
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
