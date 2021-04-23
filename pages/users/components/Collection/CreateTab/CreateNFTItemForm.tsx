import React from 'react'

const priceOptions = [{ value: 100 }, { value: 500 }, { value: 1000 }]

const CreateNFTItemForm: React.FC = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <div className={'space-y-4'}>
        <div className={'flex flex-col space-y-3'}>
          <div className={'rounded bg-gray-800 py-5 px-6 text-center'}>
            Dropzone
          </div>
          <div>
            <div className={'flex flex-col space-y-1'}>
              <label htmlFor={'title'} className={'text-sm'}>
                Title
              </label>
              <input id={'title'} placeholder={'Title...'} />
            </div>
          </div>
          <div>
            <div className={'flex flex-col space-y-1'}>
              <label htmlFor={'description'} className={'text-sm'}>
                Description
              </label>
              <textarea
                id={'description'}
                rows={4}
                placeholder={'Description...'}
              />
            </div>
          </div>
          <div>
            <div className={'flex space-x-4'}>
              <div className={'flex flex-col w-1/2 space-y-1'}>
                <label htmlFor={'duration'} className={'text-sm'}>
                  Duration
                </label>
                <select id={'duration'} placeholder={'Duration'}></select>
              </div>
              <div className={'flex flex-col w-1/2 space-y-1'}>
                <label htmlFor={'startTime'} className={'text-sm'}>
                  Start Time
                </label>
                <select id={'startTime'} placeholder={'Start Time'}></select>
              </div>
            </div>
          </div>
          <div>
            <div className={'flex flex-col space-y-1'}>
              <label className={'text-sm'}>Pick a price per NFT.</label>
              <div className={'flex space-x-4 justify-between w-full'}>
                {priceOptions.map(({ value }) => (
                  <>
                    <input
                      key={value}
                      type={'radio'}
                      id={value.toString()}
                      name={'priceOption'}
                      value={value}
                    />
                    <label htmlFor={value.toString()}>{value}</label>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            className={'text-center p-4 font-bold bg-yellow-500 w-full rounded'}
          >
            Preview NFT
          </button>
        </div>
      </div>
    </form>
  )
}

export default CreateNFTItemForm
