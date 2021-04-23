import Head from 'next/head'
import { Layout } from '../components'
import ExploreView from './ExploreView'

export default function Home() {
  return (
    <Layout>
      <div className={'w-11/12 max-w-6xl mx-auto'}>
        <ExploreView />
      </div>
    </Layout>
  )
}
