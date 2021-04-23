// TODO: Fix alignment so middle is always middle
// TODO: Remove last border: https://stackoverflow.com/questions/1175661/rule-of-thumb-for-naming-wrapper-classes
import React from 'react'

interface IProps {
  left: React.ReactNode
  middle: React.ReactNode
  right: React.ReactNode
}

const RecordCellLayout: React.FC<IProps> = ({ left, middle, right }) => {
  return (
    <div
      className={
        'flex justify-between py-3 border-b-2 border-opacity-20 border-white'
      }
    >
      <div className={'w-1/3'}>{left}</div>
      <div className={'w-1/3'}>{middle}</div>
      <div className={'w-1/3'}>{right}</div>
    </div>
  )
}

export default RecordCellLayout
