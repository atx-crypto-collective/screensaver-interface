import React, { useEffect, useState } from 'react'
import { Layout, Navbar } from '../../components'
import { useRouter } from 'next/router'
import Head from 'next/head'
import CollectionView from '../../components/CollectionView'
import { NextPage, NextPageContext } from 'next';
import { SSW_API_URL } from '../../constants';
import { Collection } from '../../types'

interface IProps {
    collection: Collection;
}


const CollectionPage: NextPage <IProps> = ({collection}) => {

    return (
      <main>
      <Layout>
        <Head>
          <title>Screensaver.world | Collection {collection.title} Collection</title>
        </Head>
        <div className={'md:mt-12 pb-8 w-11/12 mx-auto'}>
          <CollectionView collection={collection}/>
        </div>
      </Layout>
      </main>
    )
}

CollectionPage.getInitialProps = async ({
  query
}: NextPageContext): Promise<IProps> => {

  const title = query.title
  console.log('title', title)

  const res = await fetch(
    `${SSW_API_URL}/getCollectionFromTitle?title=${title}`,
  )
  const { collection } = await res.json()
  console.log('IDS', collection)
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    collection
    }
  
};

export default CollectionPage;
