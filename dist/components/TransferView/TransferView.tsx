// TODO: Let user know how much they have available to transfer
// TODO: Confirmation modal
import React, { useState } from 'react'
import QuantitySelector from '../QuantitySelector'

interface IProps {
  collectedNFTItem: {
    // TODO: Properly implement this
    title: string
    availableToTransfer: number
  }
  onFinish?: () => void
}

const TransferView: React.VFC<IProps> = ({ collectedNFTItem }) => {
  const [state, setState] = useState<
    'ready' | 'address-validated' | 'submitting'
  >('ready')
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [destinationAddress, setDestinationAddress] = useState(undefined)
  return (
    <div className={'flex flex-col space-y-20'}>
      <div>
        <h2 className={'font-bold text-xl text-center'}>
          Transfer {collectedNFTItem.title}
        </h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <div className={'flex flex-col space-y-4'}>
          <div>
            <QuantitySelector />
          </div>
          <div className={'w-full'}>
            <input
              type={'text'}
              placeholder={'Ethereum Address'}
              className={'input w-full'}
            />
          </div>
          <div>
            <button
              type={'button'}
              className={'button button--gradient w-full'}
              disabled={state !== 'address-validated'}
              onClick={() => {
                if (state !== 'address-validated') {
                  return
                }
                setIsConfirmModalOpen(true)
              }}
            >
              {state === 'ready' && <span>Enter valid address</span>}
              {state === 'address-validated' && (
                <span>Transfer to {destinationAddress}</span>
              )}
              {state === 'submitting' && <span>Transferring...</span>}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default TransferView
