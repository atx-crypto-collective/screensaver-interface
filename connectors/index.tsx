import { Web3Provider } from '@ethersproject/providers'
// import { FortmaticConnector } from '@web3-react/fortmatic-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

import { NetworkConnector } from './NetworkConnector'

const NETWORK_URL = 0 // process.env.REACT_APP_NETWORK_URL

export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '6')

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

const POLLING_INTERVAL = 12000
const RPC_URLS: { [chainId: number]: string } = {
  1: process.env.NEXT_PUBLIC_RPC_URL_1 as string,
  // 2: process.env.RPC_URL_2 as string,
  4: process.env.NEXT_PUBLIC_RPC_URL_4 as string,
  // 5: process.env.RPC_URL_5 as string,
  // 42: process.env.RPC_URL_42 as string,
}

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({ supportedChainIds: [137] }) // MetaMask

export const network = new NetworkConnector({
  urls: { 1: process.env.NEXT_PUBLIC_RPC_URL_1},
  defaultChainId: 1,
})

// export const walletconnect = new WalletConnectConnector({
//   rpc: { 1: "http://localhost:3000" },
//   bridge: 'https://bridge.walletconnect.org',
//   qrcode: true,
//   pollingInterval: POLLING_INTERVAL,
// })

// export const fortmatic = new FortmaticConnector({
//   apiKey: process.env.FORTMATIC_API_KEY as string,
//   chainId: 4,
// })
