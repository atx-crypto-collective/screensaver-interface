import React from 'react'
import { Meta } from '@storybook/react'
import TransactionHistoryTable, {
  PurchaseRecordCell,
  TransferRecordCell,
} from '../../components/TransactionHistoryTable'
import {
  IPurchaseTransaction,
  ITransactionRecord,
  ITransferTransacton,
} from '../../components/TransactionHistoryTable/types'

const transactions: ITransactionRecord[] = [
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
]

export const Empty = () => <TransactionHistoryTable transactions={[]} />
export const WithRecords = () => (
  <TransactionHistoryTable transactions={transactions} />
)
export const PopulatedPurchaseRecordCell = () => (
  <PurchaseRecordCell transaction={transactions[0] as IPurchaseTransaction} />
)
export const PopulatedTransferRecordCell = () => (
  <TransferRecordCell transaction={transactions[1] as ITransferTransacton} />
)

export default {
  title: 'Components/Transaction History Table',
  component: TransactionHistoryTable,
} as Meta
