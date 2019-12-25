const { gql } = require('apollo-server-express');

const places = gql`
    extend type Query {
        places(search: String!): [PlaceType]
    }

    type PlaceType {
     PlaceId: ID!
     PlaceName: String!
     CountryId: String!
     RegionId: String!
     CityId: String!
     CountryName: String!
   }
`;

module.exports = places;
