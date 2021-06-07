import React, { useEffect, useState } from 'react'
import { Layout } from '../../components'
import { useRouter } from 'next/router'
import ItemDetailView from './ItemDetailView'
import axios from 'axios'
import { ethers } from 'ethers'
import { GALLERY_ABI } from '../../constants/gallery'
import { getNetworkLibrary } from '../../connectors'
import NFT from '../../types'
import BiddingDetailView from './BiddingDetailView'
import Head from 'next/head'

const ItemDetailPage: React.VFC = () => {

  const router = useRouter()
  const { tokenId, preview } = router.query
  const [uri, setUri] = useState<undefined | string>()
  const [loading, setLoading] = useState<boolean>(true)
  const [metadata, setMetadata] = useState<NFT | undefined>()
  const [isPreview, setIsPreview] = useState(false)

  async function getMetadata() {
    var meta = await axios.get(uri)
    var tempMetadata = meta.data
    tempMetadata.metadataUri = uri 
    tempMetadata.creationDate = new Date(meta.data.creationDate).toString()
    setMetadata(tempMetadata)
  }

  async function getUri() {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_V0_CONTRACT_ID,
      GALLERY_ABI,
      getNetworkLibrary(),
    )
    var tokenUri = await contract.tokenURI(tokenId)
    setUri(tokenUri)
  }

  useEffect(() => {
    if (!uri) return
    console.log('URI', uri)
    getMetadata()
  }, [uri])

  useEffect(() => {
    console.log(metadata)
    if (!metadata) return
    setLoading(false)
  }, [metadata])

  useEffect(() => {

    if (!tokenId) return
    if (!!preview) {

      // add footer
      setUri('https://ipfs.io/ipfs/' + preview.toString())
      setIsPreview(true)
    } else {
      getUri()
    }
  }, [tokenId, preview])

  if (loading)
    return (
      <Layout>
        <div className={'md:mt-12 pb-8 max-w-xl mx-auto'}>Loading...</div>
      </Layout>
    )

  return (
    <>
      <Layout >
        <Head>
          <title>Screensaver.world | Object #{}</title>
          <meta name="title" content={metadata.name} />
          <meta name="description" content={metadata.description} />
          <meta property="og:title" content={metadata.name} />
          <meta property="og:image" content={metadata.image} />
          <meta property="og:description" content={metadata.description} />
          <meta property="og:url" content={`https://www.screensaver.world/object/${tokenId}`} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <div className={'md:mt-12 pb-8 w-11/12 mx-auto'}>
          <div className={'md:p-3 max-w-xl mx-auto min-h-screen'}>
            <ItemDetailView
              metadata={metadata}
              preview={isPreview}
              hash={preview?.toString()}
            />
            {!!tokenId && <BiddingDetailView tokenId={tokenId} />}
            <div>METADATA URI: {!!metadata?.metadataUri && metadata.metadataUri.split('https://ipfs.io/ipfs/')[1]}</div>
            {!!metadata.image && <div>{`MEDIA URI:${metadata.image.split('https://ipfs.io/ipfs/')[1]}`}</div>}
            {!!metadata.animation_url && <div>{`MEDIA URI: ${metadata.animation_url.split('https://ipfs.io/ipfs/')[1]}`}</div>}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ItemDetailPage
