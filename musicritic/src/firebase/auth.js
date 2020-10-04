/* @flow */

import auth from './firebase-config';

export const signInWithEmailAndPassword = (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password);

export const signInWithToken = (token: string) =>
    auth.signInWithCustomToken(token);

export const signOut = () => auth.signOut();
