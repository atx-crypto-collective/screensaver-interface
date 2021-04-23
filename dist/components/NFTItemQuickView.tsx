import React from 'react'
import CreatorAvatarAndName from './CreatorAvatarAndName'

interface IProps {
  coverImageSrc: string
  name: string
  creator: {
    name: string
    avatarSrc: string
  }
}

const NFTItemQuickView: React.FC<IProps> = ({
  coverImageSrc,
  name,
  creator,
  children,
}) => {
  return (
    <div className={'flex space-x-3 overflow-hidden max-w-md'}>
      <div className={'w-40'}>
        <img src={coverImageSrc} alt={name} />
      </div>
      <div className={'w-2/3 flex flex-col space-y-3 justify-between'}>
        <div className={'flex flex-col space-y-1'}>
          <h4 className={'font-bold text-base sm:text-lg leading-tight'}>
            {name}
          </h4>
          <CreatorAvatarAndName
            name={creator.name}
            avatarSrc={creator.avatarSrc}
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default NFTItemQuickView
