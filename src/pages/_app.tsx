import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { siteConfig } from "@/config/site";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{siteConfig.title}</title>
        {/* resizes-content keeps the message box above the on-screen keyboard on Android. */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, interactive-widget=resizes-content"
        />
        <meta name="theme-color" content="#000000" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
