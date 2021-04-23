import 'tailwindcss/tailwind.css'
import dynamic from 'next/dynamic'

const Provider = dynamic(() => import("../state/StoreProvider"), {
  ssr: false,
});


function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
