import type { Image } from 'spotify-web-sdk'

import { Query as searchQueries, Types as searchTypes } from './search'
import { Mutation as reviewAlbum } from './reviewAlbum'

const resolvers = {
  Query: {
    ...searchQueries,
  },
  Mutation: {
    ...reviewAlbum,
  },
  Image: {
    isSquared: (root: Image) => root.height === root.width,
  },
  ...searchTypes,
}

export default resolvers
