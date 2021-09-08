import React from 'react'
import { Layout } from '../../components'
import GalleryView from '../GalleryView'

const GalleryPage: React.VFC = () => {
  
  return (
    <Layout>
      <div className={'pb-8 w-full md:w-11/12 mx-auto'}>
        <GalleryView state={'mints'}/>
      </div>
    </Layout>
  )
}

export default GalleryPage
