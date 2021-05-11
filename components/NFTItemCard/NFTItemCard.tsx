import { IProps } from './types'
import ActiveNFTItemCard from './ActiveNFTItemCard'

// TODO: Rename to NFTItemAuctionCard ?
const NFTItemCard: React.FC<IProps> = (props) => {
  // const { endDateTime } = props
  // return endDateTime > new Date() ? (
    return <a href={`/object/${props?.tokenId}`}><ActiveNFTItemCard {...props} /></a>
  // ) : (
  //   <ExpiredNFTItemCard {...props} />
  // )
}

export default NFTItemCard
