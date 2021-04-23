import React from 'react'

import ItemDetailView from '../../../pages/items/ItemDetailView'

export const AuthenticatedActiveListing = () => (
  <div className={'max-w-md mx-auto'}>
    <ItemDetailView userIsAuthenticated itemListingState={'active'} />
  </div>
)
export const AuthenticatedPastListing = () => (
  <div className={'max-w-md mx-auto'}>
    <ItemDetailView userIsAuthenticated itemListingState={'past'} />
  </div>
)

export default {
  title: 'Pages/Item Detail/Components/ItemDetailView',
  component: ItemDetailView,
}
