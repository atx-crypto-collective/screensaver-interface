import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            type="module"
            src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
          />
          <script
            noModule
            src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"
          />

<meta name="twitter:card" content="screensaver" />
<meta name="twitter:site" content="@screensaverdao" />
<meta name="twitter:creator" content="@screensaverdao" />
<meta property="og:url" content="http://www.screensaver.world" />
<meta property="og:title" content="Screensaver DAO" />
<meta property="og:description" content="Screensaver DAO" />
<meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/broccoli-df8cd.appspot.com/o/Screen%20Shot%202021-05-08%20at%2011.04.18%20AM.png?alt=media&token=e61688d8-bfff-4310-aac3-4d4fddd8775e" />

          {/* <meta name="twitter:card" content="Screensaver DAO" />
          <meta name="twitter:site" content="@screensaverdao" />
          <meta name="twitter:title" content="Screensaver DAO" />
          <meta name="twitter:description" content="Screensaver DAO" />
          <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/broccoli-df8cd.appspot.com/o/Screen%20Shot%202021-05-08%20at%2011.04.18%20AM.png?alt=media&token=e61688d8-bfff-4310-aac3-4d4fddd8775e" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
