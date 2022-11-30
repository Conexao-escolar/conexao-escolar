import React from "react";
import NextDocuments, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default class Document extends NextDocuments {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QRVG6KD3K3"
          strategy="afterInteractive"
        ></Script>
        {process.env.NODE_ENV === "production" ? (
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-QRVG6KD3K3');
        `}
          </Script>
        ) : (
          ""
        )}
      </Html>
    );
  }
}
