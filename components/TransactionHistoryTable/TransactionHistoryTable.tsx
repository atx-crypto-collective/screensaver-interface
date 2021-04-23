import React from 'react'
import classNames from 'classnames'
import PurchaseRecordCell from './PurchaseRecordCell'
import TransferRecordCell from './TransferRecordCell'
import {
  IPurchaseTransaction,
  ITransactionRecord,
  ITransferTransacton,
} from './types'

interface IProps {
  transactions: ITransactionRecord[]
  bordered: boolean
}

const TransactionHistoryTable: React.VFC<IProps> = ({
  transactions,
  bordered,
}) => {
  return (
    <div
      className={classNames({
        'px-4 rounded border border-solid border-white border-opacity-25 h-96': bordered,
        'max-h-96': true,
      })}
    >
      {transactions.length === 0 && (
        <div className={'text-sm'}>No transactions.</div>
      )}
      {transactions.length > 0 &&
        transactions.map((transaction, index) =>
          transaction.type === 'purchase' ? (
            <PurchaseRecordCell
              key={index}
              transaction={transaction as IPurchaseTransaction}
            />
          ) : (
            <TransferRecordCell
              key={index}
              transaction={transaction as ITransferTransacton}
            />
          ),
        )}
    </div>
  )
}

export default TransactionHistoryTable
