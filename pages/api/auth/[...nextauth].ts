import type { Session } from 'next-auth'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { FirebaseAdapter } from '@next-auth/firebase-adapter'

import { firestore } from '@/node/lib/firebase-admin'

export type SessionWithId = Session & { user: { id?: string } }

export default NextAuth({
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      scope: `user-read-email
              user-read-private
              user-read-currently-playing
              user-read-recently-played
              user-top-read`,
    }),
  ],

  callbacks: {
    session: (session: SessionWithId, token) => {
      session.user.id = token.id as string

      return session
    },
  },

  adapter: FirebaseAdapter(firestore),
})
