const { gql } = require("apollo-server-express");

const traveler = gql`
  # extend type Query {
  #   Traveler(id: ID!): TravelerDetails
  #   allTravelers(
  #     page: Int
  #     perPage: Int
  #     sortField: String
  #     sortOrder: String
  #     filter: TravelersFilter
  #   ): [TravelerDetails]
  #   _allTravelersMeta(
  #     page: Int
  #     perPage: Int
  #     sortField: String
  #     sortOrder: String
  #     filter: TravelersFilter
  #   ): ListMetadata
  # }

  input TravelersFilter {
    q: String
    id: ID
    firstName: String
    views: Int
    views_lt: Int
    views_lte: Int
    views_gt: Int
    views_gte: Int
  }

  type ListMetadata {
    count: Int!
  }

  extend type Query {
    Traveler(id: ID!): TravelerDetails
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
