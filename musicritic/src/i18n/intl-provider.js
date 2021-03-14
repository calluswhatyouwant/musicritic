import React from 'react';
import { IntlProvider } from 'react-intl';

import pt from './messages/pt.json';
import en from './messages/en.json';

const messages = {
    'pt-br': pt,
    en: en,
};

const Provider = ({ locale, children }) => (
    <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
    </IntlProvider>
);

export default Provider;
