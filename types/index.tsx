type NFT = {
    name: string
    description: string
    broken: boolean
    creator: {
      id: string
    }
    creationDate: Date
    image: string
    animation_url: string
    metadataUri: string
    mediaUri: string
    thumbnail: string
    mimeType: string
    size: string
    media: {
      mimeType: string
      size: string
    },
    tags: string[]
    tokenId: number
    id: number

}

export type Bid = {
  bidder: {
    id: string
  }
  item: {
    creator: {
      id: string
    }
    name: string
    tokenId: string
  }
  timestamp: number
  amount: number
  accepted: boolean
}

export type Profile = {
  username?: string
  profileImage?: string
  bannerImage?: string
  description?: string 
  timestamp?: Date
}

export type Collection = {
  title: string
  ids: number[]
  description?: string 
  timestamp?: Date
  address?: string
}

export default NFT
