import React from 'react'

interface IProps {
  fileUrl: string
  coverImageUrl?: string
  mimeType?: string
}

const VideoPlayer: React.VFC<IProps> = ({
  fileUrl,
  coverImageUrl,
  mimeType,
}) => {
  return (
    <video autoPlay controls loop muted className={'w-full h-96'}>
      <source src={fileUrl} type={mimeType} />
    </video>
  )
}

export default VideoPlayer
