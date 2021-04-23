import React from 'react'

// TODO: Format with currencyJS (or similar library)
const WithdrawForm: React.FC = () => {
  const balance = 34056
  const minimumWithdrawAmount = 500
  const payoutFee = 200
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <div className={'flex flex-col space-y-16'}>
        <div className={'space-y-3 w-full text-center text-sm'}>
          <div>Minimum withdraw amount is {minimumWithdrawAmount}.</div>
          <div>A {payoutFee} fee is charged per payout.</div>
        </div>
        <div className={'w-full space-y-4'}>
          <div
            className={'p-8 text-4xl font-bold rounded bg-gray-800 text-center'}
          >
            {balance}
          </div>
          <button
            className={'p-4 text-center bg-yellow-600 rounded w-full font-bold'}
          >
            Withdraw
          </button>
        </div>
      </div>
    </form>
  )
}

export default WithdrawForm
