type NFT = {
    name: string
    description: string
    creator: {
      id: string
    }
    creationDate: Date
    image: string
    animation_url: string
    metadataUri: string
    mediaUri: string
    mimeType: string
    size: string
    media: {
      mimeType: string
      size: string
    },
    tags: string[]
    tokenId: number
}

export type Bid = {
  bidder: {
    id: string
  }
  timestamp: number
  amount: number
  accepted: boolean
}

export default NFT
