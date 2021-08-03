import spotify from './clients/spotify'
import admin, { collections } from './clients/firebase-admin'

export interface Context {
  spotify: typeof spotify
  firestore: typeof collections
  firebase: typeof admin
}

const context: Context = {
  spotify,
  firestore: collections,
  firebase: admin,
}

export default context
