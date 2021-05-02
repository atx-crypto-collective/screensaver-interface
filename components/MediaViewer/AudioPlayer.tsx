import React from 'react'

interface IProps {
  fileUrl: string
  coverImageUrl: string
  mimeType?: string
}

const AudioPlayer: React.VFC<IProps> = ({
  fileUrl,
  mimeType,
  coverImageUrl,
}) => {
  return (
    <div className={'relative w-full'}>
      <img
        className={'object-fill w-full h-64'}
        src={coverImageUrl}
        // alt={'Cover photo'}

      />
      <audio controls className={'absolute bottom-2 px-4 w-full'}>
        <source src={fileUrl} type={mimeType} />
      </audio>
    </div>
  )
}

export default AudioPlayer
