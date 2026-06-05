import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Monetag ভেরিফিকেশন মেটা ট্যাগ */}
        <meta name="monetag" content="55b3c8eebef00e9bf614d7959d49b527" />

        {/* Monetag বিজ্ঞাপনের মেইন স্ক্রিপ্ট */}
        <Script
          src="https://quge5.com/88/tag.min.js"
          data-zone="246429"
          strategy="afterInteractive"
          data-cfasync="false"
        />
        <Script
          src="https://5gvci.com/act/files/tag.min.js?z=11104410"
          strategy="afterInteractive"
          data-cfasync="false"
        />
        <Script
          src="https://n6wxm.com/vignette.min.js"
          strategy="afterInteractive"
          data-cfasync="false"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
