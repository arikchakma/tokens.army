import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(props: any) {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/static/favicons/safari-pinned-tab.svg"
          color="#111827"
        />
        <link rel="shortcut icon" href="/static/favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta
          name="msapplication-TileImage"
          content="/static/favicons/mstile-144x144.png"
        />
        <meta
          name="msapplication-config"
          content="/static/favicons/browserconfig.xml"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#F9F9FA"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#111827"
        />
      </Head>
      <body className="bg-gray-100/50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
