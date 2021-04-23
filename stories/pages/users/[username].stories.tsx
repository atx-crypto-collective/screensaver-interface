import React from 'react'

import UserProfilePage from '../../../pages/users/[username]'

// export const EmptyCollection = () => <UserProfilePage />
export const Authenticated = () => <UserProfilePage />

export default {
  title: 'Pages/User Profile/States',
  component: UserProfilePage,
}
