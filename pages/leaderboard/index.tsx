import React from 'react'
import { Layout } from '../../components'
import LeaderBoardView from '../LeaderBoardView'

const LeaderBoardPage: React.VFC = () => {
  
  return (
    <Layout>
      <div className={'pb-8 w-full md:w-11/12 mx-auto'}>
        <LeaderBoardView />
      </div>
    </Layout>
  )
}

export default LeaderBoardPage
