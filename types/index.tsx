type NFT = {
    name: string
    description: string
    creator: string
    creationDate: Date
    image: string
    animation_uri: string
    media: {
      mimeType: string
      size: string
    },
    tags: string[]
    tokenId: number
}

export default NFT
