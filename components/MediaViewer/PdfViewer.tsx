import React from 'react'

interface IProps {
  fileUrl: string
}

const PdfViewer: React.VFC<IProps> = ({ fileUrl }) => {
  return (
        <iframe
          src="https://firebasestorage.googleapis.com/v0/b/lilnif.appspot.com/o/FILE_6428.pdf?alt=media&token=4e6f8cce-0765-4716-9e2c-efb27ca180fd"
          className={'w-screen h-screen'}
        ></iframe>
  )
}

export default PdfViewer
