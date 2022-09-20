import Head from "next/head";
import "../../styles/globals.css";
import AppContext from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Conexão escolar</title>
        <link rel="shortcut icon" href="/marca-dgua.ico" type="image/x-icon" />
      </Head>
      <AppContext>
        <Component {...pageProps} />
      </AppContext>
    </>
  );
}

export default MyApp;
