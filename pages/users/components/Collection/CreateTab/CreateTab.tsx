import React from 'react'

import { NFTItemQuickView } from '../../../../../components'
import WithdrawSection from './WithdrawSection'

const CreateTab: React.VFC = () => {
  const userCreatorAccount = true
  return (
    <div className={'flex flex-col space-y-3'}>
      <div>
        {!userCreatorAccount && (
          <button
            className={
              'p-4 text-white bg-yellow-600 w-full rounded font-bold text-base'
            }
          >
            Become a Creator
          </button>
        )}
        {userCreatorAccount && (
          <button
            className={
              'p-4 text-white bg-yellow-600 w-full rounded font-bold text-base'
            }
          >
            Create an NFT
          </button>
        )}
      </div>
      {userCreatorAccount && (
        <div className={'flex flex-col space-y-5'}>
          <div className={'flex flex-col space-y-3'}>
            <div
              className={'flex justify-between p-4 bg-gray-800 rounded text-sm'}
            >
              <div>
                <span className={'font-bold'}>Payout method:</span> Card
              </div>
              <div>
                <button>Edit</button>
              </div>
            </div>
            <WithdrawSection />
          </div>
          <div>
            <div className={'space-y-2'}>
              <div className={'text-sm font-bold'}>Payouts</div>
              <hr className={'border-gray-700'} />
            </div>

            <div className={'divide-y divide-gray-700'}>
              {[1, 2, 3].map((index) => (
                <div className={'py-7 px-4'}>
                  {/** TODO: Create NFTItemPayout */}
                  <NFTItemQuickView
                    key={index}
                    name={'Lil Nifty Early Adopter Token'}
                    coverImageSrc={
                      'https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/images%2FIMG_8385.jpeg?alt=media&token=6a96e213-8a67-4a66-bb90-6a1ef5013015'
                    }
                    creator={{
                      avatarSrc:
                        'https://randomuser.me/api/portraits/women/26.jpg',
                      name: 'elenaflores',
                    }}
                  >
                    <div className={'flex flex-col text-xs pb-1 space-y-1'}>
                      <div>$50.60</div>
                      <div>100 collected</div>
                      <div className={'font-light'}>02.07.21</div>
                    </div>
                  </NFTItemQuickView>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateTab
