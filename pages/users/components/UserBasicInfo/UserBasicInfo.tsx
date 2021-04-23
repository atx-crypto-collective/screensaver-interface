import React from 'react'
import { CogIcon } from '@heroicons/react/solid'

interface IProps {
  user: {
    avatarSrcUrl: string
    username: string
  }
  userIsProfileOwner: boolean
}

const UserBasicInfo: React.VFC<IProps> = ({ user, userIsProfileOwner }) => {
  return (
    <div className={'relative'}>
      <div className={'flex flex-col space-y-3 lg:space-y-8 pt-5 lg:pt-3'}>
        <img
          src={user.avatarSrcUrl}
          className={'w-16 h-16 lg:w-40 lg:h-40 mx-auto rounded-full'}
          alt={user.username}
        />
        <div className={'flex flex-col space-y-2'}>
          <div className={'text-center font-bold text-sm'}>{user.username}</div>
          <div className={'text-center font-bold text-xs'}>social link</div>
        </div>
      </div>
      {userIsProfileOwner && (
        <button className={'icon-button absolute right-0 top-0'}>
          <CogIcon className={'w-5 h-5 lg:w-6 lg:h-6 text-gray-300'} />
        </button>
      )}
    </div>
  )
}

export default UserBasicInfo
