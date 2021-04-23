import React, { useState } from 'react'

interface IProps {
  onWithdrawComplete?: () => void
}

const WithdrawSection: React.VFC<IProps> = ({ onWithdrawComplete }) => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <div
        className={
          'flex justify-between p-4 bg-gray-800 rounded text-sm font-bold' // TODO: Normalize this
        }
      >
        <div>Withdraw: $330.01</div>
        <div>
          <button onClick={() => setModalOpen(true)}>Withdraw</button>
        </div>
      </div>
    </>
  )
}

export default WithdrawSection
