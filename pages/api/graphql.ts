import { ApolloServer } from 'apollo-server-micro'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core'

import typeDefs from '@/node/schema.graphql'
import resolvers from '@/node/resolvers'
import context from '@/node/context'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground({
          settings: { 'request.credentials': 'include' },
        }),
  ],
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const startServer = apolloServer.start()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}
