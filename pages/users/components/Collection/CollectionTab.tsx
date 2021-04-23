import React from 'react'
import NFTCollectionGridItem from '../../../../components/NFTCollectionGridItem'

interface IProps {
  items: any[]
}

const CollectionTab: React.VFC<IProps> = () => {
  return (
    <div className={'grid grid-cols-3 gap-1 lg:gap-x-4 lg:gap-y-5'}>
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={i}>
          <NFTCollectionGridItem
            coverPhotoImageSrc={
              'https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/images%2FIMG_8385.jpeg?alt=media&token=6a96e213-8a67-4a66-bb90-6a1ef5013015'
            }
            amountCollected={0}
            creator={{
              avatarImageSrc:
                'https://randomuser.me/api/portraits/women/26.jpg',
              username: 'username',
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default CollectionTab
