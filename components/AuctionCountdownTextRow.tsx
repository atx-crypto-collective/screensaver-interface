import React from 'react'

interface IProps {
  endDateTime: Date
  amountCollected?: number
}

const AuctionCountdownTextRow: React.VFC<IProps> = ({
  endDateTime,
  amountCollected,
}) => {
  const countdownText = '20hrs 10m 2s' // momentjs(endDateTime)
  return (
    <div className={'flex justify-between items-center'}>
      <div className={'text-lg opacity-80'}>{countdownText}</div>
      {amountCollected && (
        <div className={'text-sm opacity-80 uppercase'}>
          {amountCollected} collected
        </div>
      )}
    </div>
  )
}

export default AuctionCountdownTextRow
