import React from 'react'
import { Layout } from '../../components'
import GalleryView from '../../components/GalleryView'

const GalleryPage: React.VFC = () => {
  
  return (
    <Layout>
      <div className={'pb-8 w-full md:w-11/12 mx-auto'}>
        <GalleryView />
      </div>
    </Layout>
  )
}

export default GalleryPage
