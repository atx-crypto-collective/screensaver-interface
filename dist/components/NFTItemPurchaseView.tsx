// TODO: Fix vertical spacing between elements
import React from 'react'
import { PencilIcon } from '@heroicons/react/solid'
import NFTItemQuickView from './NFTItemQuickView'
import QuantitySelector from './QuantitySelector'

interface IProps {}

const NFTItemPurchaseView: React.VFC<IProps> = () => {
  const userHasPaymentMethod = true
  return (
    <div className={'flex flex-col space-y-8 lg:space-y-10'}>
      <div>
        <NFTItemQuickView
          name={'Lil Nifty Early Adopter Token'}
          coverImageSrc={
            'https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/images%2FIMG_8385.jpeg?alt=media&token=6a96e213-8a67-4a66-bb90-6a1ef5013015'
          }
          creator={{
            avatarSrc: 'https://randomuser.me/api/portraits/women/26.jpg',
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
      <div className={'flex flex-col space-y-3'}>
        <div className={'flex flex-col space-y-4'}>
          <QuantitySelector />

          {/** // TODO: !userHasPaymentMethod component */}
          <div className={'flex flex-col space-y-3'}>
            {userHasPaymentMethod && (
              <div className={'round-gray-box round-gray-box--dark'}>
                <div
                  className={
                    'flex items-center justify-between text-sm font-medium'
                  }
                >
                  <div>
                    <span className={'font-bold'}>Payment Method:</span> Card
                  </div>
                  <button className={'icon-button'}>
                    <PencilIcon className={'h-5 w-5'} />
                  </button>
                </div>
              </div>
            )}
            <div className={'round-gray-box round-gray-box--dark'}>
              <div className={'text-xs flex flex-col space-y-2 font-light'}>
                <div className={'flex justify-between'}>
                  <div>Tax</div>
                  <div>$0.30</div>
                </div>
                <div className={'flex justify-between'}>
                  <div>Fee</div>
                  <div>$0.30</div>
                </div>
                <div className={'flex justify-between'}>
                  <div>Subtotal</div>
                  <div className={'flex space-x-4'}>
                    <div>10x 5</div>
                    <div>$50.00</div>
                  </div>
                </div>
                <div className={'flex justify-between font-bold'}>
                  <div>Total</div>
                  <div>$50.60</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className={'button button--gradient w-full'}>
            Purchase for $50.00
          </button>
        </div>
      </div>
    </div>
  )
}

export default NFTItemPurchaseView
