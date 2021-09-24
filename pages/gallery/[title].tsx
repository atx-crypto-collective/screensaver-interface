import React from 'react'
import { Layout } from '../../components'
import Head from 'next/head'
import GalleryView from '../../components/GalleryView'
import { NextPage, NextPageContext } from 'next';
import { SSW_API_URL } from '../../constants';
import { Gallery } from '../../types'

interface IProps {
  gallery: Gallery;
}


const GalleryPage: NextPage <IProps> = ({gallery}) => {

    return (
      <main>
      <Layout>
        <Head>
          <title>Screensaver.world | {gallery.title} Gallery</title>
        </Head>
        <div className={'md:mt-12 pb-8 w-11/12 mx-auto'}>
          <GalleryView gallery={gallery} />
        </div>
      </Layout>
      </main>
    )
}

GalleryPage.getInitialProps = async ({
  query
}: NextPageContext): Promise<IProps> => {

  const title = query.title
  console.log('title', title)

  const res = await fetch(
    `${SSW_API_URL}/getGalleryFromTitle?title=${title}`,
  )
  const { gallery } = await res.json()
  console.log('IDS', gallery)
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    gallery
  }
  
};

export default GalleryPage;
