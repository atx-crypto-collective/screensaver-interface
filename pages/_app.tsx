import 'tailwindcss/tailwind.css'
import dynamic from 'next/dynamic'
import '../styles/global.css'
import { FirebaseTrackingProvider } from "../config/firebase";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const Provider = dynamic(() => import("../state/StoreProvider"), {
  ssr: false,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.thegraph.com/subgraphs/id/QmPSbJ2R3avv5orgv2df2u4c31qDVZ618vn2GZwiSEF93v"
});


function MyApp({ Component, pageProps }) {
  return (
    <FirebaseTrackingProvider>
      <Provider>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Provider>
    </FirebaseTrackingProvider>
  )
}

export default MyApp
