import React from 'react'
import ActionButton from './ActionButton'
import NFT from '../../types'

// interface IProps {
//   nft: NFT
//   src: string
//   alt?: string
//   actions: typeof ActionButton[] // TODO: Fix this typing which is throwing errors
// }

const ImageWithActions = ({ src, nft, alt, actions }) => {

  console.log("NFT", nft)
  return (
    <div className={'relative'}>
      { !!nft?.image ? 
            <img src={nft.image} alt={alt} className={'w-full'}/>
            :
    
            <model-viewer
            style={{
              minWidth: "100%",
              minHeight: "400px"
            }}
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
      <div className={'absolute top-2 right-2 flex pt-100%'}>
        
      </div>
    </div>
  )
}

export default ImageWithActions
