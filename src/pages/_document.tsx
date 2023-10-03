import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@700;800&family=Poppins&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/tabulator-tables/dist/css/tabulator.min.css"
          rel="stylesheet"
        />
        <script
          type="text/javascript"
          src="https://unpkg.com/tabulator-tables/dist/js/tabulator.min.js"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
