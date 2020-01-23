const { gql } = require("apollo-server-express");

const flightInspiration = gql`
  extend type Query {
    flightInspiration(
      origin: String
      departureDate: String
      viewBy: String
    ): flightInspirationResult
  }

  type flightInspirationResult {
    meta: InspirationMetaType
    data: [InspirationDataType]
    dictionaries: InspirationPlacesDictionary
  }

  type InspirationMetaType {
    currency: String
    links: MetaLinkType
    defaults: InspirationQueryDefault
  }

  type MetaLinkType {
    self: String
  }

  type InspirationQueryDefault {
    departureDate: String
    oneWay: Boolean
    nonStop: Boolean
    viewBy: String
  }

  type InspirationDataType {
    type: String
    origin: String
    destination: String
    departureDate: String
    returnDate: String
    price: InspirationPriceTotalType
    links: InspirationBookingLinks
  }

  type InspirationPriceTotalType {
    total: String
  }

  type InspirationBookingLinks {
    flightDates: String
    flightOffers: String
  }

  type InspirationPlacesDictionary {
    currencies: [[String]]
    locations: [[String]]
  }

  # "dictionaries": {
  #     "currencies": {
  #         "EUR": "EURO"
  #     },
  #     "locations": {
  #         "MAD": {
  #             "subType": "AIRPORT",
  #             "detailedName": "ADOLFO SUAREZ BARAJAS"
  #         }
  #     }
  # }
`;

module.exports = flightInspiration;
