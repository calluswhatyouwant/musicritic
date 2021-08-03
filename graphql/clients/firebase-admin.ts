import * as admin from 'firebase-admin'

import { getCurrentUser } from './spotify'

if (admin.apps.length === 0) {
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID ?? 'musicritic',
  })
}

export const firestore = admin.firestore()
export const auth = admin.auth()

export const collections = {
  albumReviews: firestore.collection('album-reviews'),
  trackReviews: firestore.collection('track-reviews'),
}

export const loginWithSpotify = async (userToken: string): Promise<string> => {
  const userSpotify = await getCurrentUser(userToken)

  await auth.getUser(userSpotify.uid).catch(() => auth.createUser(userSpotify))

  return auth.createCustomToken(userSpotify.uid)
}

export default admin
