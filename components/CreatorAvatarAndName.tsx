import React from 'react'
import classNames from 'classnames'

interface IProps {
  avatarSrc: string
  name: string
  bold?: boolean
  gray?: boolean
}

const CreatorAvatarAndName: React.FC<IProps> = ({
  avatarSrc,
  name,
  bold,
  gray,
}) => {
  return (
    <div className={'flex space-x-1 items-center'}>
      <img className={'rounded-full w-3 h-3'} src={avatarSrc} alt={name} />
      <span
        className={classNames(
          { 'font-semibold': bold },
          { 'text-gray-300': gray },
          'text-sm',
        )}
      >
        {name}
      </span>
    </div>
  )
}

export default CreatorAvatarAndName
