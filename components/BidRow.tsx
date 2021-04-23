

    // TODO: setQuantity
import React, { useState, useEffect } from 'react'
interface IProps {
  onUpdate?: (quantity: number) => void
  owner: boolean | undefined
}
const BidRow: React.VFC<IProps> = ({ onUpdate, owner = false }) => {
  const [value, setValue] = useState<string>()

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // contract call
    console.log("VALUE", value )
}

  return (
        <div className="mt-5">
          <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
            <h4 className="sr-only">Visa</h4>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 sm:mt-0 sm:ml-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">0.6 ETH</h3>
                <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                  <div>0x29398...8298H</div>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
                { owner !== undefined && 
                
                (owner ? 
              <button
                type="button"
                className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                Accept Bid
              </button>
              :
              <button
              type="button"
              className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
              Cancel Bid
            </button>)
                }
            </div>
          </div>
        </div>
  )
}

export default BidRow
