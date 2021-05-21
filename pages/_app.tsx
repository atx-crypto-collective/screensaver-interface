import 'tailwindcss/tailwind.css'
import dynamic from 'next/dynamic'
import '../styles/global.css'
import { FirebaseTrackingProvider } from "../config/firebase";
import { GraphQLClient, ClientContext } from 'graphql-hooks'

const Provider = dynamic(() => import("../state/StoreProvider"), {
  ssr: false,
});

const client = new GraphQLClient({
  url: 'https://api.thegraph.com/subgraphs/name/jsmellz/screensaver'
})


function MyApp({ Component, pageProps }) {
  return (
    <FirebaseTrackingProvider>
      <Provider>
        <ClientContext.Provider value={client}>
          <Component {...pageProps} />
        </ClientContext.Provider>
      </Provider>
    </FirebaseTrackingProvider>

  )
}

export default MyApp
