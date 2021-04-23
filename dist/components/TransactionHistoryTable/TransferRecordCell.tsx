// TODO: Truncate address in middle
import React from 'react'
import CreatorAvatarAndName from '../CreatorAvatarAndName'
import RecordCellLayout from './RecordCellLayout'
import { ITransferTransacton } from './types'

interface IProps {
  transaction: Omit<ITransferTransacton, 'type'>
}

const TransferRecordCell: React.FC<IProps> = ({ transaction }) => {
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
            {transaction.quantity} {`→`}
          </div>
        </div>
      }
      right={
        <div className={'flex flex-col text-white items-end'}>
          <div className={'w-16 text-sm overflow-hidden overflow-ellipsis'}>
            {transaction.address}
          </div>
          <div>
            <a href={'#'} className={'font-light text-xs'}>
              etherscan
            </a>
          </div>
        </div>
      }
    />
  )
}

export default TransferRecordCell
