import React from 'react'
import { Layout } from '../../components'
import ExploreView from '../../components/ExploreView'

const GalleryPage: React.VFC = () => {
  
  return (
    <Layout>
      <div className={'pb-8 w-full md:w-11/12 mx-auto'}>
        <ExploreView state={'mints'}/>
      </div>
    </Layout>
  )
}

export default GalleryPage
