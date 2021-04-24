import React from 'react'
import {
  ImageWithActions,
  ActionButton,
  NFTItemDescription,
  TransactionHistoryTable,
} from '../../components'

interface IProps {
  itemListingState: 'past' | 'active'
  userIsAuthenticated: boolean
}

const ItemDetailView: React.VFC<IProps> = ({
  userIsAuthenticated,
  itemListingState,
}) => {
  return (
    <div className={'flex flex-col space-y-12'}>
      <div className={'flex flex-col space-y-8'}>
        <div className={'space-y-3'}>
          {/* <ImageWithActions // TODO: Compose into ShareableImage
            src={
              'https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/images%2FIMG_8385.jpeg?alt=media&token=6a96e213-8a67-4a66-bb90-6a1ef5013015'
            }
            actions={[
              // TODO: Switch to square buttons
              <ActionButton
                size={'large'}
                className={
                  'bg-white border-2 border-solid border-yellow-700 text-xs sm:text-lg cursor-pointer'
                }
              >
                1
              </ActionButton>,
              <ActionButton
                size={'large'}
                className={
                  'border-2 border-solid bg-white border-purple-500 cursor-pointer text-xs sm:text-lg'
                }
              >
                2
              </ActionButton>,
            ]}
          /> */}
        </div>

        <div className={'px-3'}>
          <NFTItemDescription
            name={'Lil Nifty Early Adopter Token'}
            type={'video'}
            description={
              'Proident consequat incididunt duis ullamco magna ut quis ex do. Id consectetur id sit ut ullamco sunt voluptate adipisicing qui culpa consectetur sit sint id. Id ad cupidatat commodo laboris consequat velit officia ut adipisicing proident laborum esse excepteur. Et proident reprehenderit do laboris id id incididunt. Duis exercitation ea labore minim deserunt eiusmod sunt esse adipisicing occaecat nulla veniam eiusmod dolor. Qui dolor anim non non veniam in elit. Non consectetur ipsum qui elit adipisicing nisi quis irure occaecat.'
            }
            creator={{
              avatarSrc: 'https://randomuser.me/api/portraits/women/26.jpg',
              name: 'elenaflores',
            }}
            amountMinted={100}
            endDateTime={new Date()}
          />
        </div>
      </div>
      {userIsAuthenticated && itemListingState === 'past' && (
        <div className={'px-3'}>
          <div className={'round-gray-box'}>
            <div className={'flex justify-between text-sm'}>
              <div>
                <span className={'font-bold'}>Your Editions:</span> 10
              </div>
              <div>
                <button>Transfer</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={'flex flex-col px-3'}>
        <div className={'flex flex-col space-y-5'}>
          <div className={'text-sm font-bold'}>Transaction History</div>
          <hr className={'border-gray-700 border-t-2'} />
        </div>
        <div>
          <TransactionHistoryTable
            transactions={[
              {
                type: 'purchase',
                price: 2,
                date: new Date(),
                quantity: 1,
                user: {
                  avatarSrc: 'https://randomuser.me/api/portraits/women/26.jpg',
                  username: 'elenaflores',
                },
              },
              {
                type: 'transfer',
                date: new Date(),
                quantity: 1,
                address: '0xB99C614506fEb99753ACB7Cc0A1ead12ECE6D6C0',
                user: {
                  avatarSrc: 'https://randomuser.me/api/portraits/women/26.jpg',
                  username: 'elenaflores',
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default ItemDetailView
