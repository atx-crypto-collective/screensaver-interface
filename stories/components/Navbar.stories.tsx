import React from 'react'
import { Meta } from '@storybook/react'
import Navbar, { SearchInput } from '../../components/Navbar'

export const Generic: React.FC = () => <Navbar />

// TODO: Actually implement these
export const AnonymousUser: React.FC = () => <Navbar />
export const AuthenticatedUser: React.FC = () => <Navbar />

export const SmallSearchInput = () => (
  <SearchInput placeholder={'Placeholder...'} size={'small'} />
)
export const LargeSearchInput = () => (
  <SearchInput placeholder={'Placeholder...'} size={'large'} />
)

export default {
  title: 'Components/Navbar',
  component: Navbar,
} as Meta
