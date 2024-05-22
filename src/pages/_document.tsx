import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@700;800&family=Poppins&display=swap"
          rel="stylesheet"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="robots" content="nofollow" />
      </Head>
      <body>
        <Main />
        <div id="backdrop"></div>
        <div id="calendar"></div>

        <NextScript />
      </body>
    </Html>
  );
}
