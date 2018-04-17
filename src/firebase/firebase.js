import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN
}

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const auth = firebase.auth();
