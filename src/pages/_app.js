import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return <div className="bg-gray-800">
    <Head>
      <title>Aaron Projects</title>
    </Head>
    <Component {...pageProps} />
  </div>
}
