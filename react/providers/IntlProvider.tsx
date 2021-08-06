import React from 'react'
import type { FC, PropsWithChildren } from 'react'
import { IntlProvider } from 'react-intl'

import en from '../../messages/en.json'
import pt from '../../messages/pt.json'

const messages = { en, pt }

interface Props {
  locale: 'pt' | 'en'
}

const Provider: FC<PropsWithChildren<Props>> = ({ locale, children }) => (
  <IntlProvider locale={locale} messages={messages[locale]}>
    {children}
  </IntlProvider>
)

export default Provider
