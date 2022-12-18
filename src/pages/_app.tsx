import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import "../../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Conexão escolar</title>
        <link rel="shortcut icon" href="/marca-dgua.ico" type="image/x-icon" />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
