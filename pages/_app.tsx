import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'react-redux'
import store from '@Root/middleware/redux/store'
import Layout from '@Components/Layout'

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
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
