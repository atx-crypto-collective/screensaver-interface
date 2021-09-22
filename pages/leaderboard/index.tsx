import React from 'react'
import { Layout } from '../../components'
import LeaderboardView from '../../components/LeaderboardView'

const LeaderBoardPage: React.VFC = () => {
  
  return (
    <Layout>
      <div className={'pb-8 w-full md:w-11/12 mx-auto'}>
        <LeaderboardView />
      </div>
    </Layout>
  )
}

export default LeaderBoardPage
