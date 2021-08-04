import type { Image } from 'spotify-web-sdk'

import { Query as searchQueries, Types as searchTypes } from './search'
import { Mutation as reviewMutations } from './review'
import { dateScalar } from './date'

const resolvers = {
  Query: {
    ...searchQueries,
  },
  Mutation: {
    ...reviewMutations,
  },
  Image: {
    isSquared: (root: Image) => root.height === root.width,
  },
  ...searchTypes,
  Date: dateScalar,
}

export default resolvers
