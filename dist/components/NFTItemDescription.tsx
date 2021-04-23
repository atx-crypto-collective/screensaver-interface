// TODO: Truncate text
import React from 'react'
import CreatorAvatarAndName from './CreatorAvatarAndName'

interface IProps {
  name: string
  creator: {
    avatarSrc: string
    name: string
  }
  type: string // TODO: Enum
  description: string
  amountMinted: number
  endDateTime: Date
}

const NFTItemDescription: React.VFC<IProps> = ({
  name,
  creator,
  amountMinted,
  description,
  type,
}) => {
  return (
    <div className={'flex flex-col space-y-8 sm:space-y-10'}>
      <div className={'flex flex-col space-y-3 sm:space-y-6'}>
        <h2 className={'font-semibold text-lg text-white'}>{name}</h2>
        <div className={'flex justify-between items-center'}>
          <div>
            <CreatorAvatarAndName
              name={creator.name}
              avatarSrc={creator.avatarSrc}
            />
          </div>
          <div className={'uppercase text-sm font-medium text-purple-50'}>
            {amountMinted} minted
          </div>
        </div>
      </div>
      <div className={'flex flex-col space-y-3 text-lg text-white'}>
        {false && <div className={'uppercase font-light'}>Media: {type}</div>}
        <div className={'text-sm font-light'}>{description}</div>
      </div>
    </div>
  )
}

export default NFTItemDescription
