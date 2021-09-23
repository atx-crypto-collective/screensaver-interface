import React from 'react'
import { Layout } from '../../components'
import GalleryView from '../../components/GalleryView'
import Banner from '../../components/Banner'
import Header from '../../components/Header'

const GalleryPage: React.VFC = () => {
  
  return (
    <Layout>
      <Banner/>
      <Header/>
      <div className={'pb-8 w-full md:w-11/12 mx-auto'}>
        <GalleryView />
      </div>
    </Layout>
  )
}

export default GalleryPage
