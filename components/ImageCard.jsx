// TODO: Lazy image loading?
import React, {useState, useEffect} from 'react'
import NFT from '../types'
import VideoPlayer from './MediaViewer/VideoPlayer'
import AudioPlayer from './MediaViewer/AudioPlayer'
import PdfViewer from './MediaViewer/PdfViewer'

// export interface IProps {
//   nft?: NFT
//   srcUrl?: string
//   altText: string
//   footer?: React.ReactElement
// }

const ImageCard  = ({ srcUrl, nft, altText, footer, children }) => {

  const [type, setType] = useState('')

  useEffect(() => {
    if (!nft?.media?.mimeType) return 
    const typeArray = nft?.media?.mimeType.split('/')
    console.log("TYPE", typeArray[0])
    setType(typeArray[0])
  }, [])

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

      { type === 'image' && (
        <img src={nft.image} alt={altText} className={'w-full'}/>
      )}
      {type === 'video' && (
        <VideoPlayer fileUrl={nft.animation_url} />
      )}
      {type === 'audio' && (
        <AudioPlayer fileUrl={nft.animation_url} />
      )}

      {type === 'model' && (
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
      )}

      {type === 'application' && (
        <PdfViewer fileUrl={nft.animation_url} />
      )}


            {/* { !!nft?.image ? 
            <img src={nft.image} alt={altText} className={'w-full'}/>
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
            } */}
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
