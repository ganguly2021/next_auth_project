import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";

import store from "./../front_end/redux/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import Footer from "./../front_end/components/Layout/Footer";
import Navbar from "./../front_end/components/Layout/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="description" content="NextJS Project With Auth." />
        <link rel="icon" href="/favicon.ico" />

        {/* CSS Animate CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />

        {/* Bootstrap 5 CSS */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />

        {/* Fontawesome 6 CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <Provider store={store}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          maxSnack={3}
        >
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </SnackbarProvider>
      </Provider>
      <footer>
        {/* jQuery 3 CDN */}
        <Script
          src="https://code.jquery.com/jquery-3.6.0.slim.min.js"
          integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI="
          crossOrigin="anonymous"
        ></Script>
        {/* Bootstrap 5 JS */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossOrigin="anonymous"
        ></Script>
      </footer>
    </>
  );
}

export default MyApp;
