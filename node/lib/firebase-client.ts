import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.MUSICRITIC_PROD_FIREBASE_API_KEY,
  authDomain: process.env.MUSICRITIC_PROD_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.MUSICRITIC_PROD_FIREBASE_DATABASE_URL,
  projectId: process.env.MUSICRITIC_PROD_FIREBASE_PROJECT_ID,
  appId: process.env.MUSICRITIC_PROD_FIREBASE_APP_ID,
}

if (firebase.apps.length === 0) {
  const db = firebase.initializeApp(firebaseConfig).firestore()

  if (process.env.NODE_ENV !== 'production') {
    db.useEmulator('localhost', 8080)
  }
}

export const firestoreClient = firebase.apps[0].firestore()
