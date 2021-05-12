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

          {/* Twitter */}
          <meta name="twitter:card" content="summary" key="twcard" />
          <meta name="twitter:creator" content={'@screensaverdao'} key="twhandle" />

          {/* Open Graph */}
          {/* <meta property="og:url" content={`https://www.screensaver.world/gallery`} key="ogurl" /> */}
          {/* <meta property="og:image" content={''} key="ogimage" />
          <meta property="og:site_name" content={'Screensaver Dao'} key="ogsitename" /> */}
          <meta property="og:title" content={'Screensaver Dao'} key="ogtitle" />
          {/* <meta property="og:description" content={'Screensaver Dao Auction'} key="ogdesc" /> */}
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
