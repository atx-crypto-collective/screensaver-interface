import React, { useState } from 'react'
import CollectionTab from './CollectionTab'
import CreateTab from './CreateTab/CreateTab'

interface IProps {
  userIsProfileOwner: boolean
}
const Collection: React.VFC<IProps> = ({ userIsProfileOwner }) => {
  const [tab, setTab] = useState<'collection' | 'create'>('collection') // TODO: Map to route
  return (
    <div className={'flex flex-col space-y-2 lg:space-y-6'}>
      <div className={'self-center'}>
        <div className={'flex'}>
          <button onClick={() => setTab('collection')}>[Collection]</button>
          {userIsProfileOwner && (
            <>
              <div>|</div>
              <button onClick={() => setTab('create')}>[Create]</button>
            </>
          )}
        </div>
      </div>
      <div>
        {tab === 'collection' && <CollectionTab items={[]} />}
        {userIsProfileOwner && tab === 'create' && (
          <div className={'w-full lg:max-w-md lg:mx-auto'}>
            <CreateTab />
          </div>
        )}
      </div>
    </div>
  )
}

export default Collection
