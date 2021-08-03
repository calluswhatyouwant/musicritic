import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { FirebaseAdapter } from '@next-auth/firebase-adapter'

import { firestore } from '@/graphql/clients/firebase-admin'

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

  adapter: FirebaseAdapter(firestore),
})
