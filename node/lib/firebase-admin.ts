import * as admin from 'firebase-admin'

if (admin.apps.length === 0) {
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID ?? 'musicritic',
    })
  } else {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.MUSICRITIC_PROD_FIREBASE_CLIENT_EMAIL,
        projectId: process.env.MUSICRITIC_PROD_FIREBASE_PROJECT_ID,
        privateKey: process.env.MUSICRITIC_PROD_FIREBASE_PRIVATE_KEY?.replace(
          /\\n/gm,
          '\n'
        ),
      }),
      databaseURL: process.env.MUSICRITIC_PROD_FIREBASE_DATABASE_URL,
    })
  }
}

export const firestore = admin.firestore()
export const auth = admin.auth()

export const collections = {
  reviews: firestore.collection('reviews'),
  users: firestore.collection('users'),
}

export default admin
