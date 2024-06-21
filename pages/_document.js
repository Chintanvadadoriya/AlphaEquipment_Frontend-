import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <meta name="description" content="" />
          <meta name="og:title" property="og:title" content="Alpha Equipment" />
          <meta
            name="og:description"
            property="og:description"
            content="Alpha Equipment"
          />
          <meta property="og:url" content="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Urbanist:wght@300;400;500;600;700;900&display=swap"
            rel="stylesheet"
          ></link>
          {/* <link href="/fonts/stylesheet.css" rel="stylesheet" />                 */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
