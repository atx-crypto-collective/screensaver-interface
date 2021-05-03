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

        <meta name="twitter:card" content="Screensaver DAO" />
        <meta name="twitter:site" content="@screensaverDAO" />
        <meta name="twitter:title" content="Screensaver DAO" />
        <meta name="twitter:description" content="Screensaver DAO" />
        <meta name="twitter:image" content="www.screensaver.world" />
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
