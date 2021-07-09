import './../style/global.css'
import NavigationBar from './../components/NavigationBar'
import Head from 'next/head'
import logo_sm from './../assets/logo-sm.png'
import logo_md from './../assets/logo-md.png'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href={logo_sm.src} />
        <link rel="apple-touch-icon" href={logo_md.src} />
      </Head>
      <NavigationBar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
