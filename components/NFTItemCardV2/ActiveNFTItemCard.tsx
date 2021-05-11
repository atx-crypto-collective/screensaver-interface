import React from 'react'

import ImageCard from '../ImageCard'
import AuctionCountdownTextRow from '../AuctionCountdownTextRow'

import { IProps } from './types'

/*
{itemListingState === 'active' && (
  <button
    className={
      'text-xl font-bold absolute right-3 bottom-3 p-2 lg:p-4 bg-yellow-600 rounded'
    }
  >
    $10
  </button>
)}
</div>
{itemListingState === 'active' && (
<div className={'round-gray-box}>
  <div className={'text-center text-xl font-light'}>
    24hrs 34m 23s
  </div>
</div>
)}
*/
const NFTItemCard: React.FC<IProps> = ({
  title,
  coverImageSrc,
  creator,
  endDateTime,
  amountCollected,
}) => {
  
  return (
      <div className={'flex flex-col space-y-1 px-2'}>
        <h1 className={'font-bold text-base'}>{title}</h1>
        <div className={'flex items-center space-x-1'}>
          <div className={'w-3 h-3 rounded-full overflow-hidden'}>
            <img
              src={creator.avatarImageSrc}
              alt={`${creator.name}'s avatar`}
            />
          </div>
          <h2 className={'font-bold text-sm opacity-80'}>{creator.name}</h2>
        </div>
      </div>
  )
}

export default NFTItemCard
