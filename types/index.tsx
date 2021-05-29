type NFT = {
    name: string
    description: string
    creator: {
      id: string
    }
    creationDate: Date
    mediaUri: string
    // image: string
    // animation_url: string
    mimeType: string
    size: string
    media: {
      mimeType: string
      size: string
    },
    tags: string[]
    tokenId: number
}

export default NFT
