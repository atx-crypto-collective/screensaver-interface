import React from 'react'
import { Layout } from '../../components'
import GalleriesView from '../../components/GalleriesView'

const GalleriesPage: React.VFC = () => {
  
  return (
    <Layout>
      <div className={'pb-8 w-full md:w-11/12 mx-auto'}>
        <GalleriesView />
      </div>
    </Layout>
  )
}

export default GalleriesPage
