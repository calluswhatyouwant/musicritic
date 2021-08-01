import { ApolloServer } from 'apollo-server-micro'

import typeDefs from '@/graphql/schema.graphql'
import resolvers from '@/graphql/resolvers'
import context from '@/graphql/context'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
