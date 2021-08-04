import type { NextApiRequest } from 'next'
import { getSession } from 'next-auth/client'

import type { SessionWithId } from 'pages/api/auth/[...nextauth]'

import spotify from './clients/spotify'
import admin, { collections } from './clients/firebase-admin'

export interface Context {
  auth: SessionWithId | null
  spotify: typeof spotify
  firestore: typeof collections
  firebase: typeof admin
}

const context = async ({ req }: { req: NextApiRequest }): Promise<Context> => {
  const auth = (await getSession({ req })) as SessionWithId

  return {
    auth,
    spotify,
    firestore: collections,
    firebase: admin,
  }
}

export default context
