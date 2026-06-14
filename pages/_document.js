import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="YKV5isgDqhu4dkETERczQhgtmDNNuQDOgnulgr_Jlf8"
        />
      </Head>

      <body>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3178631785053369"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
