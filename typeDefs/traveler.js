const { gql } = require("apollo-server-express");

const traveler = gql`
  extend type Query {
    Traveler(id: ID!): TravelerDetails
  }

  extend type Query {
    allTravelers: [TravelerDetails]
  }

  extend type Mutation {
    addTraveler(input: TravelerInfo!): TravelerDetails
  }

  input TravelerInfo {
    firstName: [[String!]!]!
    middleName: [[String!]!]!
    lastName: [[String!]!]!
    dateOfBirth: [[String!]!]!
    title: [[String!]!]!
    email: String!
    phoneNum: String!
  }

  type TravelerDetails {
    id: ID!
    firstName: [[String!]!]!
    middleName: [[String!]!]!
    lastName: [[String!]!]!
    dateOfBirth: [[String!]!]!
    title: [[String!]!]!
    email: String!
    phoneNum: String!
    createdAt: String!
  }
`;
module.exports = traveler;
