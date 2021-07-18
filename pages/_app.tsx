import type { AppProps } from 'next/app'
import Head from 'next/head'

import type { Page } from '../typings/page'

type Props = AppProps & {
  Component: Page
}

function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <title>Musicritic</title>
        <meta
          name="description"
          content="Your personal music-specific Metacritic"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}

export default App
