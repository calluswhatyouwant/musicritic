import { GraphQLScalarType, Kind } from 'graphql'

import admin from '../lib/firebase-admin'

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date scalar type',
  serialize(value) {
    if (value instanceof admin.firestore.Timestamp)
      return value.toDate().getTime()

    return value.getTime() // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value) // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)) // Convert hard-coded AST string to integer and then to Date
    }

    return null // Invalid hard-coded value (not an integer)
  },
})
