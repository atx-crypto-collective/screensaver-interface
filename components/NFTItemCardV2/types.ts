export interface IProps {
  title: string
  coverImageSrc: string
  creator: {
    avatarImageSrc: string
    name: string
  }
  endDateTime: Date
  amountCollected: number
}
