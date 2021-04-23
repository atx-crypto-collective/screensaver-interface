// TODO: Rename to ExpiredNFTAuctionItemCard ?
import React from 'react'
import ImageCard from '../ImageCard'
import { IProps } from './types'

const NFTItemCard: React.FC<IProps> = ({
  title,
  coverImageSrc,
  creator,
  endDateTime,
  amountCollected,
}) => {
  return (
    <ImageCard srcUrl={coverImageSrc} altText={`${title} cover image`}>
      <div className={'flex flex-col space-y-1 px-2 pt-3'}>
        <h1 className={'font-bold text-base'}>{title}</h1>
        <div className={'flex items-center space-x-1'}>
          {/* <div className={'w-3 h-3 rounded-full overflow-hidden'}>
            <img
              src={creator.avatarImageSrc}
              alt={`${creator.name}'s avatar`}
            />
          </div> */}
          <div className={'flex justify-between items-center w-full'}>
            <h2 className={'font-medium text-sm opacity-80'}>{creator.name}</h2>
            {/* <div className={'font-bold text-sm uppercase'}>
              {amountCollected} collected
            </div> */}
          </div>
        </div>
      </div>
    </ImageCard>
  )
}

export default NFTItemCard
