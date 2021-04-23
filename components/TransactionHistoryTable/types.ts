interface ITransactionBase {
  // id
  type: 'purchase' | 'transfer'
  user: {
    avatarSrc: string
    username: string
  }
  date: Date
  quantity: number
}

export interface IPurchaseTransaction extends ITransactionBase {
  price: number
}

export interface ITransferTransacton extends ITransactionBase {
  address: string
}

export type ITransactionRecord = IPurchaseTransaction | ITransferTransacton
