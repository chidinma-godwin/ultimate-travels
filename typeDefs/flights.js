const { gql } = require("apollo-server-express");

const flights = gql`
  extend type Query {
    flightDetails(sessionKey: String!): PollResultType
  }

  type PollResultType {
    Query: PollQueryType
    Status: String
    Itineraries: [ItinarariesType]
    Legs: [LegsType]
    Segments: [SegmentsType]
    Carriers: [CarriersType]
    Agents: [AgentsType]
    Places: [AirportCityType]
    Currencies: [CurrencyType]
  }

  type PollQueryType {
    Country: String
    Currency: String
    Locale: String
    Adults: Int
    Children: Int
    Infants: Int
    OriginPlace: String
    DestinationPlace: String
    OutboundDate: String
    LocationSchema: String
    CabinClass: String
    GroupPricing: Boolean
  }

  type ItinarariesType {
    OutboundLegId: String
    PricingOptions: [PricingType]
    BookingDetailsLink: BookingDetailsType
  }

  type PricingType {
    Agents: [Int]
    QuoteAgeInMinutes: Int
    Price: Float
    DeeplinkUrl: String
  }

  type BookingDetailsType {
    Uri: String
    Body: String
    Method: String
  }

  type LegsType {
    Id: ID
    SegmentIds: [Int]
    OriginStation: Int
    DestinationStation: Int
    Departure: String
    Arrival: String
    Duration: Int
    JourneyMode: String
    Stops: [Int]
    Carriers: [Int]
    OperatingCarriers: [Int]
    Directionality: String
    FlightNumbers: [FlightNumberType]
  }

  type FlightNumberType {
    FlightNumber: String
    CarrierId: Int
  }

  type SegmentsType {
    Id: ID
    OriginStation: Int
    DestinationStation: Int
    DepartureDateTime: String
    ArrivalDateTime: String
    Carrier: Int
    OperatingCarrier: Int
    Duration: Int
    FlightNumber: String
    JourneyMode: String
    Directionality: String
  }

  type CarriersType {
    Id: ID
    Code: String
    Name: String
    ImageUrl: String
    DisplayCode: String
  }

  type AgentsType {
    Id: ID
    Name: String
    ImageUrl: String
    Status: String
    OptimisedForMobile: Boolean
    Type: String
  }

  type AirportCityType {
    Id: Int
    ParentId: Int
    Code: String
    Type: String
    Name: String
  }

  type CurrencyType {
    Code: String
    Symbol: String
    ThousandsSeparator: String
    DecimalSeparator: String
    SymbolOnLeft: Boolean
    SpaceBetweenAmountAndSymbol: Boolean
    RoundingCoefficient: Int
    DecimalDigits: Int
  }
`;

module.exports = flights;