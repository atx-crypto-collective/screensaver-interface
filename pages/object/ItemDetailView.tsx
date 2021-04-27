import React from 'react'
import {
  ImageWithActions,
  ActionButton,
  NFTItemDescription,
  TransactionHistoryTable,
} from '../../components'
import NFT from '../../types'
import MintButton from '../../components/MintButton'

interface IProps {
  itemListingState: 'past' | 'active'
  userIsAuthenticated: boolean
  metadata : NFT
  preview: boolean
  hash?: string
}

const ItemDetailView: React.VFC<IProps> = ({
  userIsAuthenticated,
  itemListingState,
  metadata,
  preview,
  hash
}) => {
  return (
    <div className={'flex flex-col space-y-12'}>
      <div className={'flex flex-col space-y-8'}>
        <div className={'space-y-3'}>
          <ImageWithActions // TODO: Compose into ShareableImage
            src={
              metadata.image
            }
            actions={
              [
              // TODO: Switch to square buttons
              // <ActionButton
              //   size={'large'}
              //   className={
              //     'bg-white border-2 border-solid border-yellow-700 text-xs sm:text-lg cursor-pointer'
              //   }
              // >
              //   1
              // </ActionButton>,
              // <ActionButton
              //   size={'large'}
              //   className={
              //     'border-2 border-solid bg-white border-purple-500 cursor-pointer text-xs sm:text-lg'
              //   }
              // >
              //   2
              // </ActionButton>,
            ]
          }
          />
        </div>

        <div className={'px-3'}>
        { preview &&  <MintButton hash={hash}/>}
        <div className={'text-2xl font-bold py-3'} >{metadata.name}</div>

        <div className={'text-sm text-lg py-3'} ><strong>Description: </strong>{metadata.description}</div>
          <div className={'text-sm py-3'}><strong>Creator: </strong> {metadata.creator}</div>
          <div className={'text-sm py-3'}>{metadata.creationDate}</div>
          <div className={'text-sm py-3'}><strong>MimeType: </strong> {metadata.media.mimeType}</div>

        </div>
      </div>
    
    </div>
  )
}

export default ItemDetailView
