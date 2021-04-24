import Head from 'next/head'
import { Layout } from '../components'
import Mint from '../components/Mint'

export default function Home() {
  return (
    <Layout >
      <div className={'w-11/12 max-w-2xl mx-auto py-6'}>
        <Mint />
      </div>
    </Layout>
  )
}
