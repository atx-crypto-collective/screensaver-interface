import React, { useEffect, useState } from 'react'
import { Layout, Navbar } from '../components'
import { useRouter } from 'next/router'
import Head from 'next/head'
import AccountView from '../components/AccountView'
import { NextPage, NextPageContext } from 'next';
import { SSW_API_URL } from '../constants';

interface IProps {
  account: string;
}

const UserPage: NextPage <IProps> = ({account}) => {

  console.log("ACCOUNT", account)
  
    return (
      <main>
      <Layout>
        <Head>
          <title>Screensaver.world | Created by {account.toString()}</title>
        </Head>
        <div className={'md:mt-12 pb-8 w-11/12 mx-auto'}>
          <AccountView state={'created'} account={account.toString()} />
        </div>
      </Layout>
      </main>
    )
}

UserPage.getInitialProps = async ({
  query
}: NextPageContext): Promise<IProps> => {

  const user = query.user
  console.log('user', user)

  const res = await fetch(
    `${SSW_API_URL}/getAddressFromUsername?username=${user}`,
  )
  const { address } = await res.json()
  console.log('ADDRESS', address, user)
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
      account: address?.toLowerCase(),
    }
  
};

export default UserPage;
