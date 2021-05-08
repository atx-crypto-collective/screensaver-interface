import 'tailwindcss/tailwind.css'
import dynamic from 'next/dynamic'
import '../styles/global.css'
import { FirebaseTrackingProvider } from "../config/firebase";

const Provider = dynamic(() => import("../state/StoreProvider"), {
  ssr: false,
});


function MyApp({ Component, pageProps }) {
  return (
    <FirebaseTrackingProvider>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </FirebaseTrackingProvider>

  )
}

export default MyApp
