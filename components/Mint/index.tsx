import { useState, useEffect } from 'react'
import { storage } from '../../config/firebase'
import axios from 'axios'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { GALLERY_ABI } from '../../constants/gallery'
import Modal from '../../components/Modal'
import classNames from 'classnames'
import { injected } from '../../connectors'
import { useRouter } from 'next/router'

const parseTags = (tags: string): string[] => {
  var tagString = tags.replace(/\s/g, '')
  var tagArray = tagString.split(',')
  console.log(tagArray)
  return tagArray
}

export default function Mint() {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [media, setMedia] = useState<File>()
  const [date, setDate] = useState(0)
  const [size, setSize] = useState(0)
  const [mimeType, setType] = useState('')
  const {
    chainId,
    account,
    activate,
    active,
    deactivate,
    library,
  } = useWeb3React<Web3Provider>()
  const [mintSuccess, setMintSuccess] = useState(false);
  const [id, setId] = useState('')
  const [open, setOpen] = useState(false)
  const [totalSupply, setTotalSupply] = useState(0)
  const router = useRouter()

  async function createToken(uri: string) {
    const contract = new ethers.Contract(    
      process.env.NEXT_PUBLIC_CONTRACT_ID,
      GALLERY_ABI,
      library.getSigner(account),
    )

    getBalance()
    await contract.createToken(uri)
  }

  async function getBalance() {
    const contract = new ethers.Contract(    
      process.env.NEXT_PUBLIC_CONTRACT_ID,
      GALLERY_ABI,
      library.getSigner(account),
    )
    var supply = await contract.totalSupply()
    setTotalSupply(supply + 1)
  }

  async function mintNFT() {
    setLoading(true)
    try {
      // 1. upload image
      const mediaUrl = await uploadFile(media)
      console.log('HERER', mediaUrl)
      // 2. send metadata
      const uri = await postMetadata(mediaUrl)
      console.log('URI', uri)

      const hash = uri.split('/')

      // 3. call createToken
      // await createToken(uri)
      router.push(`/object/1?preview=${hash[hash.length - 1]}`)

      // setMintSuccess(true)
      

      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  async function postMetadata(imageUrl: string) {
    var uri = 'https://us-central1-broccoli-df8cd.cloudfunctions.net/api/mint'

    var parsedTags = parseTags(tags)
    console.log('imageUrl', imageUrl, mimeType, size, date)

    // setDate(media.lastModified)
    // setSize(media.size)
    // setType(media.type)

    const metadata = {
      name: title,
      creationDate: media.lastModified,
      uri: imageUrl,
      description: description,
      media: {
        mimeType: media.type,
        size: media.size,
      },
      tags: parsedTags,
      creator: account
    }

    console.log('METADATA', metadata)

    // post request

    try {
      const metadataUri = await axios.post(uri, metadata)

      console.log('URIII', metadataUri)
      return metadataUri.data.uri
    } catch (error) {
      throw new Error('error posting to ipfs')
    }

    // await
  }

  async function uploadFile(file: File) {
    // Create a root reference
    var storageRef = storage().ref()
    var name = file.name

    // Create a reference to 'mountains.jpg'
    var fileRef = storageRef.child(name.split(' ').join('_'))

    await fileRef.put(file)
    var downloadUrl = await fileRef.getDownloadURL()

    return downloadUrl
  }

  const submit = (evt) => {
    evt.preventDefault()
    console.log('HELLO', media)

    console.log(
      'METADTA MEDIA',
      'DATE',
      date,
      media.lastModified,
      'SIZE',
      size,
      media.size,
      'TYPE',
      mimeType,
      media.type,
    )
    if (chainId !== 137) {
      setOpen(true)
      console.log('HEHEHER')
    } else {
      mintNFT()
    }
  }

  return (
    <div>

      <Modal status={'switch-network'} open={open} setOpen={setOpen} />

      <form className="space-y-8 divide-y divide-gray-200" onSubmit={submit}>
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="mt-1 max-w-3xl text-3xl text-white font-bold">
                Mint
              </h3>
              <p className="mt-1 max-w-2xl text-xs text-gray-00 font-light">
                All creators receive 15% royalties on any resale of their NFTs.
              </p>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
                >
                  Title
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex shadow-sm">
                    {/* <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        workcation.com/
                      </span> */}
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="flex-1 block w-full focus:ring-red-500 focus:border-red-500 min-w-0 sm:text-sm border-gray-700 bg-gray-900"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
                >
                  Description
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="max-w-lg shadow-sm block w-full focus:ring-red-500 focus:border-red-500 sm:text-sm border-gray-700  bg-gray-900"
                    defaultValue={''}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <p className="mt-2 text-sm text-gray-300">
                    Write a few sentences about your NFT.
                  </p>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
                >
                  Tags
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    placeholder={'music, experimental, jazz'}
                    className="max-w-lg shadow-sm block w-full focus:ring-red-500 focus:border-red-500 sm:text-sm border-gray-700 bg-gray-900"
                    defaultValue={''}
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                  <p className="mt-2 text-sm text-gray-300">
                    Add tags seperated by commas.
                  </p>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="cover_photo"
                  className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
                >
                  Upload NFT
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed">
                    {media ? (
                      <div>{media.name} ready!</div>
                    ) : (
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="mt-4 w-full justify-center inline-flex items-center px-2 py-2 border border-red-300 shadow-sm text-red-300 text-sm font-medium rounded-full text-red-300 bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              //   value={media}
                              onChange={(e) => setMedia(e.target.files[0])}
                            />
                          </label>
                        </div>
                        <p className="pl-1 text-sm text-gray-300">
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          Upload .png and .jpg up to 10MB. More file support coming very soon!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              // className="ml-6 inline-flex items-center px-4 py-2 border border-red-300 text-xs rounded-full font-medium rounded-sm shadow-sm text-red-300 bg-gray-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"

              className="mt-4 w-full justify-center inline-flex items-center px-6 py-3 border border-red-300 shadow-sm text-red-300 font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              disabled={!media}
              // onClick={() => setOpen(true)}
            >
              Preview NFT
              {loading && (
                <svg
                  className="animate-spin -mr-1 ml-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
            </button>
            <div className={'text-white'}>
              {mintSuccess &&
                `https://opensea.io/assets/matic/0x91A5b869bF327A3E0A2ffb4aF5Ca138749fb7851/${totalSupply}`}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
