import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Layout } from '../../components'
import AccountView from '../AccountView'

const CollectionPage: React.VFC = () => {
  const router = useRouter()
  const { account } = router.query

  return (
    <Layout>
      <Head>
        <title>Screensaver.world | Owned by {account.toString()}</title>
      </Head>
      <div className={'md:mt-12 pb-8 w-11/12 mx-auto'}>
        <AccountView state={'owned'} />
      </div>
    </Layout>
  )
}

export default CollectionPage
