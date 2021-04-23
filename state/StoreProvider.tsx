// copied from https://levelup.gitconnected.com/build-a-modal-using-react-context-portals-and-hooks-bd0c4e54537e

import { Web3Provider } from '@ethersproject/providers'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { NetworkContextName } from '../constants'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

// if ('ethereum' in window) {
//   ;(window.ethereum as any).autoRefreshOnNetworkChange = false
// }

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}

export default function StoreProvider({ children }: any) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        {children}
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}
