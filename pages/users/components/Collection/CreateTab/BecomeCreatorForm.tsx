import React from 'react'

const BecomeCreatorForm: React.FC = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <div className={'flex flex-col space-y-28'}>
        <div className={'space-y-3 w-full text-center text-sm'}>
          <div>
            All creator profiles are currently invite only. Grab an invite code
            from an active Lil Nifty artist and enter it here to start creating
            niftys!{' '}
          </div>
        </div>
        <div className={'w-full space-y-4'}>
          <div className={'flex flex-col space-y-1'}>
            <label htmlFor={'inviteCode'} className={'text-sm'}>
              Enter Invite Code
            </label>
            <input
              id={'inviteCode'}
              type={'text'}
              className={'w-full'}
              placeholder={'000000'}
            />
          </div>
          <button
            className={'p-4 text-center bg-yellow-600 rounded w-full font-bold'}
          >
            Enter
          </button>
        </div>
      </div>
    </form>
  )
}

export default BecomeCreatorForm
