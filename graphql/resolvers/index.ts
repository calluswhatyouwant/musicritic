import type { Image } from 'spotify-web-sdk'

import { Query as searchQueries, Types as searchTypes } from './search'

const resolvers = {
  Query: {
    ...searchQueries,
  },
  Image: {
    isSquared: (root: Image) => root.height === root.width,
  },
  ...searchTypes,
}

export default resolvers
