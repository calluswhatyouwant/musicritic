import { Provider as AuthProvider } from 'next-auth/client'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import type { FC } from 'react'

import IntlProvider from '@/providers/IntlProvider'
import ThemeProvider from '@/providers/ThemeProvider'

import type { Page } from '../typings/page'

type Props = AppProps & {
  Component: Page
}

const App: FC<Props> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
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
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </IntlProvider>
    </AuthProvider>
  )
}

export default App
