/* @flow */

import React, { useState, useEffect, createContext, useContext } from 'react';
import type { User } from 'firebase';
import './App.css';

import Navbar from './Navbar';
import MainContent from './MainContent';
import auth from '../../firebase/firebase-config';
import IntlProvider from '../../i18n/intl-provider';
import { useLocale } from '../../utils/hooks';

export const useCurrentUser = () => {
    const [user, setUser] = useState('unknown');
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(u => {
            if (u) {
                setUser(u);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);
    return user;
};

const AuthContext = createContext<{ user: User }>({ user: null });

export const useSession = () => {
    const { user } = useContext(AuthContext);
    return user;
};

const App = () => {
    const { locale, changeLocale } = useLocale();
    const user = useCurrentUser();

    return (
        <IntlProvider locale={locale}>
            <AuthContext.Provider value={{ user }}>
                <Navbar locale={locale} changeLocale={changeLocale} />
                <MainContent />
            </AuthContext.Provider>
        </IntlProvider>
    );
};

export default App;
