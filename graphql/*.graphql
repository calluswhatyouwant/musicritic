schema {
  query: Query
  mutation: Mutation
}
type User {
  id: String!
  name: String
}
type Query {
  user (id: String): User
}
type Mutation {
  addUser (
    # Name for the User item
    name: String!): User!
}