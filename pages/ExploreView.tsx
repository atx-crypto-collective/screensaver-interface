import React, { useState } from 'react'
import NFTItemCardV2 from '../components/NFTItemCardV2'

const ExploreView: React.VFC = () => {
  const [openTab, setOpenTab] = useState<'active' | 'completed'>('active')
  return (
    <div className={'flex flex-col space-y-4'}>
      {/* <div className={'self-center'}>
        <button
          className={openTab === 'active' ? 'underline' : ''}
          onClick={() => setOpenTab('active')}
        >
          Open Editions
        </button>{' '}
        |{' '}
        <button
          className={openTab === 'completed' ? 'underline' : ''}
          onClick={() => setOpenTab('completed')}
        >
          Sold
        </button>
      </div> */}
      <div className={'font-light'}>Owner: 0x83hsjhdjhdfksh</div>
      <div className={'grid gap-4 md:grid-cols-2 lg:grid-cols-3 mx-auto'}>
        {openTab === 'active' &&
          [1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i}>
              <NFTItemCardV2
                title={'Bong Dog'}
                coverImageSrc={
                  'https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/images%2FIMG_8385.jpeg?alt=media&token=6a96e213-8a67-4a66-bb90-6a1ef5013015'
                }
                creator={{
                  avatarImageSrc:
                    'https://randomuser.me/api/portraits/women/26.jpg',
                  name: 'elenaflores',
                }}
                endDateTime={new Date('1/1/2100')}
                amountCollected={100}
              />
            </div>
          ))}
        {openTab === 'completed' &&
          [1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i}>
              <NFTItemCardV2
                title={'Bong Dog'}
                coverImageSrc={
                  'https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/images%2FIMG_8385.jpeg?alt=media&token=6a96e213-8a67-4a66-bb90-6a1ef5013015'
                }
                creator={{
                  avatarImageSrc:
                    'https://randomuser.me/api/portraits/women/26.jpg',
                  name: 'elenaflores',
                }}
                endDateTime={new Date('1/1/2000')}
                amountCollected={100}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default ExploreView
