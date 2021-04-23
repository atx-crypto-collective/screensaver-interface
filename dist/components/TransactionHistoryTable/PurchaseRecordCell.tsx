// TODO: Format date to MM.DD.YY
import React from 'react'
import CreatorAvatarAndName from '../CreatorAvatarAndName'
import RecordCellLayout from './RecordCellLayout'
import { IPurchaseTransaction } from './types'

interface IProps {
  transaction: Omit<IPurchaseTransaction, 'type'>
}

const PurchaseRecordCell: React.FC<IProps> = ({ transaction }) => {
  return (
    <RecordCellLayout
      left={
        <div className={'flex flex-col space-y-1 text-white'}>
          <CreatorAvatarAndName
            avatarSrc={transaction.user.avatarSrc}
            name={transaction.user.username}
            bold
          />
          <div className={'font-light text-xs'}>
            {transaction.date.toDateString()}
          </div>
        </div>
      }
      middle={
        <div className={'flex justify-center text-sm space-x-4 text-white'}>
          <div>
            {transaction.quantity}x ${transaction.price}
          </div>
        </div>
      }
      right={
        <div className={'flex text-white text-sm justify-end'}>
          ${transaction.quantity * transaction.price}
        </div>
      }
    />
  )
}

export default PurchaseRecordCell
