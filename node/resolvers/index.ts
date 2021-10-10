import type { Image } from 'spotify-web-sdk'

import { Query as searchQueries, Types as searchTypes } from './search'
import {
  Mutation as reviewMutations,
  Query as reviewQueries,
  Types as reviewTypes,
} from './review'
import { dateScalar } from './date'

const resolvers = {
  Query: {
    ...searchQueries,
    ...reviewQueries,
  },
  Mutation: {
    ...reviewMutations,
  },
  Image: {
    isSquared: (root: Image) => root.height === root.width,
  },
  ...reviewTypes,
  ...searchTypes,
  Date: dateScalar,
}

export default resolvers
