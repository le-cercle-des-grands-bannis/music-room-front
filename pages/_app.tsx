import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'react-redux'
import store from '@Root/middleware/redux/store'
import Layout from '@Components/Layout'
import { useEffect } from 'react'
import ClientOnly from '@Components/Layout/clientOnly'

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <ClientOnly>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClientOnly>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <App Component={Component} pageProps={pageProps} {...pageProps} />
    </Provider>
  )
}

export default appWithTranslation(MyApp)
