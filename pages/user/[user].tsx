import React, { useEffect, useState } from 'react'
import { Layout, Navbar } from '../../components'
import { useRouter } from 'next/router'
import Head from 'next/head'
import AccountView from '../AccountView'

interface IProps {
  account: string
}

const UserPage: React.VFC<IProps> = ({ account }) => {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  // if (router.isFallback) {
  //   return (
  //     <Layout>
  //       <div>Loading...</div>
  //     </Layout>
  //   )
  // }

  return (
    <Layout>
      <Head>
        <title>Screensaver.world | Created by {account.toString()}</title>
      </Head>
      <div className={'md:mt-12 pb-8 w-11/12 mx-auto'}>
        <AccountView state={'created'} account={account.toString()} />
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: false //indicates the type of fallback
  }
}
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps(context) {
  const user = context.params.user

  const res = await fetch(
    `https://us-central1-broccoli-df8cd.cloudfunctions.net/api/getAddressFromUsername?username=${user}`,
  )
  const { address } = await res.json()
  console.log('ADDRESS', address)
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      account: address.toLowerCase(),
    },
  }
}

export default UserPage
