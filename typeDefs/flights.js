const { gql } = require("apollo-server-express");

const flights = gql`
  extend type Query {
    flightDetails(
      originLocationCode: String
      destinationLocationCode: String
      departureDate: String
      returnDate: String
      adults: Int
      children: Int
      infants: Int
      travelClass: String
      includeAirlineCodes: String
      excludeAirlineCodes: String
      nonStop: String
      currencyCode: String
      max: Int
    ): PollResultType
  }

  type PollResultType {
    meta: MetaType
    data: [DataType]
    dictionaries: DictionaryType
  }

  type DictionaryType {
    carriers: [[String]]
  }

  type MetaType {
    count: Int
    links: FlightSelfType
  }

  type FlightSelfType {
    self: String
  }

  type DataType {
    type: String
    id: ID
    source: String
    instantTicketingRequired: Boolean
    nonHomogeneous: Boolean
    oneWay: Boolean
    lastTicketingDate: String
    numberOfBookableSeats: Int
    itineraries: [ItinerariesType]
    price: PriceType
    pricingOptions: PricingOptionsType
    validatingAirlineCodes: [String]
    travelerPricings: [TravelerPricingsType]
  }

  type ItinerariesType {
    duration: String
    segments: [SegmentsType]
  }

  type SegmentsType {
    departure: DepartureType
    arrival: ArrivalType
    carrierCode: String
    number: String
    aircraft: AircraftCodeType
    operating: CarrierCodeType
    id: ID
    numberOfStops: Int
    blacklistedInEU: Boolean
  }

  type CarrierCodeType {
    carrierCode: String
  }

  type AircraftCodeType {
    code: String
  }

  type ArrivalType {
    iataCode: String
    at: String
  }

  type DepartureType {
    iataCode: String
    terminal: String
    at: String
  }

  type PriceType {
    currency: String
    total: String
    base: String
    fees: [AmountType]
  }

  type AmountType {
    amount: String
    type: String
  }

  type PricingOptionsType {
    fareType: [String]
    includedCheckedBagsOnly: Boolean
  }

  type TravelerPricingsType {
    travelerId: ID
    fareOption: String
    travelerType: String
    price: TravelerPricingPriceType
    fareDetailsBySegment: [FareDetailsBySegmentType]
  }

  type TravelerPricingPriceType {
    currency: String
    total: String
    base: String
  }

  type FareDetailsBySegmentType {
    segmentId: ID
    cabin: String
    fareBasis: String
    class: String
    includedCheckedBags: IncludedCheckedBagsType
  }

  type IncludedCheckedBagsType {
    weight: Int
    weightUnit: String
  }
`;

module.exports = flights;
