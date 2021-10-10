import * as admin from 'firebase-admin'

if (admin.apps.length === 0) {
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID ?? 'musicritic',
  })
}

export const firestore = admin.firestore()
export const auth = admin.auth()

export const collections = {
  reviews: firestore.collection('reviews'),
  users: firestore.collection('users'),
}

export default admin
