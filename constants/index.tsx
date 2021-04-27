
import { ChainId, Token } from '@uniswap/sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

// import { injected, walletconnect } from '../connectors'
import { injected } from '../connectors'

export const SECONDS_PER_BLOCK = 14

export const DEFAULT_TOKEN_PRECISION = 18

export const iconUrlByProviderId: { [key: string]: string } = {
  network: '/icons/providers/coinbase.svg',
  fortmatic: '/icons/providers/fortmatic.svg',
  metamask: '/icons/providers/metamask.svg',
  portis: '/icons/providers/portis.svg',
  // wallet_connect: '/icons/providers/walletconnect.svg',
}

export const NetworkContextName = 'NETWORK'

export const POLYGON_MAINNET_PARAMS = {
  chainId: '0x89', // A 0x-prefixed hexadecimal chainId
  chainName: 'Polygon Mainnet',
  nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18
  },
  rpcUrls: ['https://rpc-mainnet.matic.network'],
  blockExplorerUrls: ['https://explorer.matic.network/']
}

export interface ContractList {
  delegation?: string
  controlledCommitteeRewardsBuilder?: string
  compoundPoolBuilder?: string
  permitAndDepositDai?: string
  prizePool?: string
  token?: string
  ticket?: string
  sponsorship?: string
  committeeRewards?: string
  cDai?: string
  cUsdc?: string
}

export const POOL_ADDRESS: string = '0xf784709d2317D872237C4bC22f867d1BAe2913AB'

export const DAI = new Token(
  ChainId.MAINNET,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin'
)
export const USDC = new Token(
  ChainId.MAINNET,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD//C'
)
export const UP1 = new Token(
  ChainId.MAINNET,
  '0x597B280EcA614558D0F7FEbb357455772DC762De',
  18,
  'UP1',
  'Upshot One Token'
)

export const CONTRACT_ADDRESSES: { [chainId in ChainId]?: ContractList } = {
  [ChainId.MAINNET]: {},
  [ChainId.ROPSTEN]: {},
  [ChainId.RINKEBY]: {
    delegation: '0x3371Ef2C975999e378ba7D02F8a9e7e6ccAadfE7',
    controlledCommitteeRewardsBuilder: '0x3c2c7ecca5ac96e95298dccd4b3936f343611ff6',
    compoundPoolBuilder: '0x58a8d463b72f63e8217e5ea53e99c1af5de2b0ab',
    permitAndDepositDai: '0xf4636c41c7296eb80f96e6d518149bd82e46b8a4',
    prizePool: '0x4e61e7bfc55218a6fe6bbd169d02865dd53603a4',
    token: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
    ticket: '0x7aa0eF730993627A39603ACd543165d849dF1859',
    sponsorship: '0x3fC3afA28Dd473B033FdCe4A17b833c9384e0567',
    committeeRewards: '0xf2f228166eb3abB5a6D9F225e1BBa593f5D48272',
    cDai: '0x2acc448d73e8d53076731fea2ef3fc38214d0a7d',
  },
  [ChainId.GÖRLI]: {},
  [ChainId.KOVAN]: {},
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  // WALLET_CONNECT: {
  //   connector: walletconnect,
  //   name: 'WalletConnect',
  //   iconName: 'walletConnectIcon.svg',
  //   description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
  //   href: null,
  //   color: '#4196FC',
  //   mobile: true,
  // },
}

// Group IDs (art-related) to display `creator` attributes
export const GROUPS_WITH_CREATORS = [1]

// Traits to ignore on NFT page
export const TRAITS_IGNORE = ['tag']
