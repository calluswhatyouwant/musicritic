/* @flow */

import React, { useState, useEffect, createContext, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import type { User } from 'firebase';
import './App.css';

import Navbar from './Navbar';
import MainContent from './MainContent';
import auth from '../../firebase/firebase-config';

const useCurrentUser = () => {
    const [user, setUser] = useState(auth.currentUser);
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
    const user = useCurrentUser();
    return (
        <AuthContext.Provider value={{ user }}>
            <Navbar />
            <ToastContainer />
            <MainContent />
        </AuthContext.Provider>
    );
};

export default App;
