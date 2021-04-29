// TODO: setQuantity
import React, { useState, useEffect } from 'react'
interface IProps {
  onUpdate?: (quantity: number) => void
  sale: boolean
}
const SetSalePrice: React.VFC<IProps> = ({ onUpdate, sale = true }) => {
  const [value, setValue] = useState<string>()

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // contract call
    console.log("VALUE", value )
}

  return (
    <div className={'flex flex-col space-y-3'}>
      <label htmlFor="number" className="block text-sm font-medium text-white">
        {sale ? 'Sale Price' : 'Place Bid'}
      </label>
      <form className="mt-5 sm:flex sm:items-center" onSubmit={handleSubmit}>
        <div className="w-full sm:max-w-xs">
          <div className=" flex rounded-md shadow-sm">
            <input
              type="number"
              name="number"
              id="number"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-2xl border-gray-300 rounded-l-sm bg-gray-900"
              placeholder="0.1"
              min="0.00"
              step="0.01"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <span className="inline-flex items-center px-6 rounded-r-sm border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
              ETH
            </span>
          </div>
        </div>
        {sale ? (
          <button
            type="submit"
            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Set Price
          </button>
        ) : (
          <button
            type="submit"
            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Place Bid
          </button>
        )}
      </form>
      {/* { !isNumber &&
      <p className="mt-2 text-sm text-red-300" id="number-error">
        This should be a numeric value.
      </p>
    } */}
    </div>
  )
}

export default SetSalePrice
