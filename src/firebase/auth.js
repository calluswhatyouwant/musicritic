import { auth } from './firebase-config';

export const signIn = (email, password) => 
    auth.signInWithEmailAndPassword(email, password);

export const getCurrentUser = () => auth.currentUser;

export const getAccessToken = () => getCurrentUser().getIdToken();
