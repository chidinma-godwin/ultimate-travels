const { gql } = require("apollo-server-express");

const places = gql`
  extend type Query {
    places(keyword: String!): [PlaceType]
  }

  type PlaceType {
    type: String
    subType: String
    name: String
    detailedName: String
    id: String
    self: SelfType
    iataCode: String
    address: AddressType
  }

  type SelfType {
    href: String
    methods: [String]
  }

  type AddressType {
    cityName: String
    countryName: String
  }
`;

module.exports = places;
