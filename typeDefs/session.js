const { gql } = require("apollo-server-express");

const session = gql`
  extend type Query {
    createSession(
      cabinClass: String!
      children: String
      infants: String
      country: String!
      currency: String!
      locale: String!
      originPlace: String!
      destinationPlace: String!
      outboundDate: String!
      adults: String!
      groupPricing: Boolean
    ): NullType
  }

  type NullType {
    _: Boolean
  }
`;

module.exports = session;
