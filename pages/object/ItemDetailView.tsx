import React from 'react'
import {
  ImageWithActions
} from '../../components'
import NFT from '../../types'
import AccountId from '../../components/AccountId'
import { useRouter } from 'next/router'

interface IProps {
  metadata: NFT
  hash?: string
}

const ItemDetailView: React.VFC<IProps> = ({
  metadata,
  hash,
}) => {

  const router = useRouter()
  const { tokenId, preview } = router.query

  return (
    <div>
      <ImageWithActions
        src={metadata.image}
        alt={metadata.name}
        nft={metadata}
        actions={[]}
      />
      <div className={'text-red-400'}>
        OBJ: #{tokenId}
      </div>
      <div className={'right-0 w-full border-t border-white'} />
      <div className={'text-md flex w-full'}>
        {/* TODO: swear to god lisa if you add the space character to add margin*/}
        <strong>MORE ART BY &nbsp;</strong> <AccountId linkToCreated address={metadata.creator} />
      </div>
    </div>
  )
}

export default ItemDetailView
