import React, { useEffect } from 'react'
import { Layout, Navbar } from '../../components'

import ItemDetailView from './ItemDetailView'

const ItemDetailPage: React.VFC = () => {
  // TODO: Pull item by slug from router

  // state : preview & not preview 

  useEffect(() => {
    // call contract with id 
  }, [])
  
  return (
    <Layout>
      <div className={'md:mt-12 pb-8 w-11/12 mx-auto'}>
        <div
          className={
            'md:p-3 md:border md:border-solid md:border-gray-700 md:rounded max-w-xl mx-auto'
          }
        >
          <ItemDetailView userIsAuthenticated itemListingState={'past'} />
        </div>
      </div>
    </Layout>
  )
}

export default ItemDetailPage
