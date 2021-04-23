import React from 'react'
import UserBasicInfo from './components/UserBasicInfo/UserBasicInfo'
import Collection from './components/Collection/Collection'
import { Layout, Navbar } from '../../components'

const UserProfilePage = () => {
  const userIsProfileOwner = true // TODO: Pull from auth
  return (
    <Layout>
      <div className={'max-w-4xl mx-auto w-11/12 lg:mt-12'}>
        <div className={'flex flex-col space-y-7'}>
          <div className={'w-full lg:max-w-md lg:mx-auto'}>
            <UserBasicInfo
              user={{
                username: 'elenaflores',
                avatarSrcUrl:
                  'https://randomuser.me/api/portraits/women/26.jpg',
              }}
              userIsProfileOwner={userIsProfileOwner}
            />
          </div>
          <div>
            <Collection userIsProfileOwner={userIsProfileOwner} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UserProfilePage
