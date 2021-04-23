import React from 'react'
import { Meta } from '@storybook/react'
import NFTItemDescription from '../../components/NFTItemDescription'

export const Basic = () => (
  <div className={'max-w-lg mx-auto'}>
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
)

export default {
  title: 'Components/NFT Item Descripton',
  component: NFTItemDescription,
} as Meta
