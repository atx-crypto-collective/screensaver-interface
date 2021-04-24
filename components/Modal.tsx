/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { CheckIcon } from '@heroicons/react/outline'
import { shortenAddress, getSigner } from '../utils'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { injected } from '../connectors'
import styles from '../styles/Wallet.module.css'
import { useGalleryContract } from '../hooks/useContract'
import { ethers } from 'ethers'
import { GALLERY_ABI } from '../constants/gallery'

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
}

async function approve() {
  const galleryContract = useGalleryContract(
    '0x310dB1c2a19cb03Fe45493139AE89a7d92f49f44',
  )
  const estimatedGas = await galleryContract.approve(
    '0x8237c3EB572DBc370cCe499a09F57c9986971e40',
  )
}

const Modal: React.VFC<IProps> = ({ open, setOpen }) => {
  const galleryContract = useGalleryContract(
    '0x310dB1c2a19cb03Fe45493139AE89a7d92f49f44',
  )

  const {
    chainId,
    account,
    activate,
    active,
    deactivate,
    library,
  } = useWeb3React<Web3Provider>()

  useEffect(() => {
    console.log('ACCOUNT', account)

    if (!account) return
    async function approveMethod() {
      const contract = new ethers.Contract(
        '0x310dB1c2a19cb03Fe45493139AE89a7d92f49f44',
        GALLERY_ABI,
        library.getSigner(account),
      )

      const transaction = await contract.approve(
        '0x310dB1c2a19cb03Fe45493139AE89a7d92f49f44',
        1,
      )

      console.log(transaction)
    }

    approveMethod()
  }, [account])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              {true ? (
                <>
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-xl leading-6 font-bold text-gray-900"
                      >
                        {!account
                          ? 'Connect Your Wallet'
                          : shortenAddress(account)}
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      onClick={!account ? () => activate(injected) : deactivate}
                      className="inline-flex items-center px-6 py-3 shadow-sm text-base font-medium rounded-md text-white"
                    >
                      {!account ? 'Connect with Metamask' : 'Deactivate'}
                    </button>

                    <div className="mt-4">
                      <p className="text-sm text-gray-500">New to Ethereum?</p>
                      <a>Learn more about wallets</a>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-xl leading-6 font-bold text-gray-900"
                      >
                        Approve Broccoli Contract
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      onClick={() => console.log('HELLO')}
                      type="button"
                      className="inline-flex items-center px-6 py-3 shadow-sm text-base font-medium rounded-md text-white button--gradient"
                    >
                      Approve
                    </button>

                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        Allow Broccoli contract to operate bidding.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
