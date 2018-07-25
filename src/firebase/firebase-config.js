import * as firebase from 'firebase';

const config = {
    apiKey: '<API_KEY>',
    authDomain: '<PROJECT_ID>.firebaseapp.com',
    databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = { auth: firebase.auth };

export default auth;
