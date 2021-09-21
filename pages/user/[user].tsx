import React, { useEffect, useState } from 'react'
import { Layout, Navbar } from '../../components'
import { useRouter } from 'next/router'
import Head from 'next/head'
import AccountView from '../AccountView'
import { NextPage, NextPageContext } from 'next';

/* Name.tsx component */

// import NextPage generic type
// Props interface
// with username set to string
interface IProps {
  account: string;
}

const MyComponent: NextPage <IProps> = ({account}) => {
  const router = useRouter()

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
      return (
        <Layout>
          <div>Loading...</div>
        </Layout>
      )
    }
  
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


interface Context extends NextPageContext {
  // any modifications to the default context, e.g. query types
}

MyComponent.getInitialProps = async ({
  query
}: NextPageContext): Promise<IProps> => {

  const user = query.user
  console.log('user', user)

  const res = await fetch(
    `https://us-central1-broccoli-df8cd.cloudfunctions.net/api/getAddressFromUsername?username=${user}`,
  )
  const { address } = await res.json()
  console.log('ADDRESS', address, user)
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
      account: address.toLowerCase(),
    }
  
};


// // const Page: NextPage<Props> = ({ account }) => (
// //   <main>Your user agent: {userAgent}</main>
// // )

// // Page.getInitialProps = async ({ req }) => {
// //   const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
// //   return { userAgent }
// // }

export default MyComponent

// const UserPage: NextPage <IProps> = ({ account }) => {
//   const router = useRouter()

//   // If the page is not yet generated, this will be displayed
//   // initially until getStaticProps() finishes running
//   if (router.isFallback) {
//     return (
//       <Layout>
//         <div>Loading...</div>
//       </Layout>
//     )
//   }

//   return (
//     <main>
//     <Layout>
//       <Head>
//         <title>Screensaver.world | Created by {account.toString()}</title>
//       </Head>
//       <div className={'md:mt-12 pb-8 w-11/12 mx-auto'}>
//         <AccountView state={'created'} account={account.toString()} />
//       </div>
//     </Layout>
//     </main>
//   )
// }

// export async function getStaticPaths() {
//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: false //indicates the type of fallback
//   }
// }
// // This function gets called at build time on server-side.
// // It won't be called on client-side, so you can even do
// // direct database queries. See the "Technical details" section.
// export async function getStaticProps(context) {
//   const user = context.params.user

//   const res = await fetch(
//     `https://us-central1-broccoli-df8cd.cloudfunctions.net/api/getAddressFromUsername?username=${user}`,
//   )
//   const { address } = await res.json()
//   console.log('ADDRESS', address)
//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       account: address.toLowerCase(),
//     },
//   }
// }

// interface Context extends NextPageContext {
//   // any modifications to the default context, e.g. query types
// }

// UserPage.getInitialProps = async (ctx: Context) => {
//   return "account"
// }


// export default UserPage

// import React from 'react'
// import { NextPageContext } from 'next'

// interface Props {
//   account?: string;
// }

// export default class UserPage extends React.Component<Props> {
//   static async getInitialProps({ req, context }: NextPageContext) {
//     const account = req ? req.headers['account'] : navigator.account

//     const user = context.params.user

// // //   const res = await fetch(
// // //     `https://us-central1-broccoli-df8cd.cloudfunctions.net/api/getAddressFromUsername?username=${user}`,
// // //   )
// // //   const { address } = await res.json()
// // //   console.log('ADDRESS', address)
// // //   // By returning { props: { posts } }, the Blog component
// // //   // will receive `posts` as a prop at build time
// // //   return {
// // //     props: {
// // //       account: address.toLowerCase(),
// // //     },
// // //   }

//     return { account }
//   }

//   render() {
//   const router = useRouter()

//   // If the page is not yet generated, this will be displayed
//   // initially until getStaticProps() finishes running
//   if (router.isFallback) {
//     return (
//       <Layout>
//         <div>Loading...</div>
//       </Layout>
//     )
//   }

//   return (
//     <main>
//     <Layout>
//       <Head>
//         <title>Screensaver.world | Created by {account.toString()}</title>
//       </Head>
//       <div className={'md:mt-12 pb-8 w-11/12 mx-auto'}>
//         <AccountView state={'created'} account={account.toString()} />
//       </div>
//     </Layout>
//     </main>
//   )
//   }
// }

// // setting type for index page
// const UserPage: NextPage <IProps> = ({ account }) => {
//   return <h1>Hello World!</h1>;
// };

// // exporting IndexPage as default export
// export default UserPage;