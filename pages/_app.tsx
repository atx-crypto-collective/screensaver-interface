import 'tailwindcss/tailwind.css'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import NProgress from 'nprogress';
import { FirebaseTrackingProvider } from "../config/firebase";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import 'nprogress/nprogress.css';
import '../styles/global.css';

const Provider = dynamic(() => import("../state/StoreProvider"), {
  ssr: false,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.thegraph.com/subgraphs/name/jsmellz/screensaverv1"
});

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
