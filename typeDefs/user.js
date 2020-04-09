const { gql } = require("apollo-server-express");

const user = gql`
  extend type Query {
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
      token: String!
    ): UserResponse
    signIn(email: String!, password: String!, token: String!): UserResponse
    signOut: Boolean
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type UserResponse {
    ok: Boolean!
    errors: [Error!]
    user: User
  }

  type Error {
    path: String!
    message: String!
  }
`;

module.exports = user;
