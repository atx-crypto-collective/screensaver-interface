import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'
import { db } from '../../config/firebase'

interface IProps {
  status: string
  open: boolean
  setOpen: (open: boolean) => void
}

const ReportModal: React.VFC<IProps> = ({ open, setOpen }) => {

  const router = useRouter()
  const { tokenId } = router.query

  function report(tokenId) {
    db.collection("admin").doc("blacklist").get().then( doc => {
      if (!doc.exists) return 

      if (!!doc.data().ids) {
        let blocklist = doc.data().ids
        blocklist.push(tokenId)
        db.collection("admin").doc("blacklist").update({ids: blocklist}).then( () => {
          router.push('/gallery')
        })
      } 

    })

  }

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
            <div className="inline-block align-bottom bg-white rounded-sm px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div className={'m-4'}>
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-xl leading-6 font-bold text-gray-900 mb-6"
                    >
                      Reported content will be removed immediately but blocked status can be voted on in Snapshot.
                    </Dialog.Title>
                  </div>
                </div>
                {/* <div className="mt-5 sm:mt-5"> */}
                <button
                  type="button"
                  onClick={() => report(tokenId)}
                  className="inline-flex items-center px-6 py-3 shadow-sm text-base font-medium rounded-md text-white bg-red-300"
                >
                  Report Content
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ReportModal
