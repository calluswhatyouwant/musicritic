import { Provider as AuthProvider } from 'next-auth/client'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import IntlProvider from '@/providers/IntlProvider'
import ThemeProvider from '@/providers/ThemeProvider'

import type { Page } from '../typings/page'

type Props = AppProps & {
  Component: Page
}

const App: FC<Props> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const startLoading = () => {
      setLoading(true)
      NProgress.start()
    }

    const endLoading = () => {
      setLoading(false)
      NProgress.done()
    }

    Router.events.on('routeChangeStart', startLoading)
    Router.events.on('routeChangeComplete', endLoading)
    Router.events.on('routeChangeError', endLoading)

    return () => {
      Router.events.off('routeChangeStart', startLoading)
      Router.events.off('routeChangeComplete', endLoading)
      Router.events.off('routeChangeError', endLoading)
    }
  }, [])

  const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <AuthProvider session={pageProps.session}>
        <IntlProvider locale="pt">
          <ThemeProvider>
            <Head>
              <title>Musicritic</title>
              <meta
                name="description"
                content="Your personal music-specific Metacritic"
              />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            {getLayout(<Component loading={loading} {...pageProps} />)}
          </ThemeProvider>
        </IntlProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
