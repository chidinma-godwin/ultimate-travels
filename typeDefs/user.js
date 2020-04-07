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
      password: String
      confirmPassword: String
    ): User
    signIn(email: String!, password: String!, token: String): User
    signOut: Boolean
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }
`;

module.exports = user;
