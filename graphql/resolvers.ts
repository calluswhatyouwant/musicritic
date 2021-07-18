import { Query as usersQueries } from './users'

const resolvers = {
  Query: {
    ...usersQueries,
  },
}

export default resolvers
