const { gql } = require("apollo-server-express");

const checkOffer = gql`
  extend type Query {
    checkOffer(input: OfferInput): OfferResponseType
  }

  input OfferInput {
    data: DataInputType
  }

  input DataInputType {
    type: String
    flightOffers: [FlightOffersInputType]
  }

  input FlightOffersInputType {
    type: String
    id: ID
    source: String
    instantTicketingRequired: Boolean
    nonHomogeneous: Boolean
    oneWay: Boolean
    lastTicketingDate: String
    numberOfBookableSeats: Int
    itineraries: [ItinerariesInputType]
    price: PriceInputType
    pricingOptions: PricingInputOptions
    validatingAirlineCodes: [String]
    travelerPricings: [TravelerInputPricings]
    paymentCardRequired: Boolean
  }

  input ItinerariesInputType {
    duration: String
    segments: [SegmentsInputType]
  }

  input SegmentsInputType {
    departure: DepartureInputType
    arrival: ArrivalInputType
    carrierCode: String
    number: String
    aircraft: AircraftInputType
    operating: OperatingInputType
    id: ID
    numberOfStops: Int
    blacklistedInEU: Boolean
  }

  input DepartureInputType {
    iataCode: String
    at: String
  }

  input ArrivalInputType {
    iataCode: String
    terminal: String
    at: String
  }

  input AircraftInputType {
    code: String
  }

  input OperatingInputType {
    carrierCode: String
  }

  input PriceInputType {
    currency: String
    grandTotal: String
    total: String
    base: String
    fees: [FeesInputType]
  }

  input FeesInputType {
    amount: String
    type: String
  }

  input PricingInputOptions {
    fareType: [String]
    includedCheckedBagsOnly: Boolean
  }

  input TravelerInputPricings {
    travelerId: ID
    fareOption: String
    travelerType: String
    price: TravelerPriceInputType
    fareDetailsBySegment: [FareDetailsBySegmentInput]
  }

  input TravelerPriceInputType {
    currency: String
    total: String
    base: String
  }

  input FareDetailsBySegmentInput {
    segmentId: String
    cabin: String
    fareBasis: String
    class: String
    includedCheckedBags: IncludedCheckedBagsInput
  }

  input IncludedCheckedBagsInput {
    quantity: Int
  }

  # Response schema
  type OfferResponseType {
    data: OfferDataType
  }

  type OfferDataType {
    type: String
    flightOffers: [FlightOffersType]
    dictionaries: OfferDictionariesType
  }

  type FlightOffersType {
    type: String
    id: ID
    source: String
    instantTicketingRequired: Boolean
    nonHomogeneous: Boolean
    lastTicketingDate: String
    itineraries: [OfferItinerariesType]
    price: OfferPriceType
    pricingOptions: OfferPricingOptions
    validatingAirlineCodes: [String]
    travelerPricings: [OfferTravelerPricings]
    paymentCardRequired: Boolean
  }

  type OfferItinerariesType {
    segments: [OfferSegmentsType]
  }

  type OfferSegmentsType {
    departure: OfferDepartureType
    arrival: OfferArrivalType
    carrierCode: String
    number: String
    aircraft: OfferAircraftType
    operating: OfferOperatingType
    id: ID
    numberOfStops: Int
    duration: String
  }

  type OfferDepartureType {
    iataCode: String
    at: String
  }

  type OfferArrivalType {
    iataCode: String
    terminal: String
    at: String
  }

  type OfferAircraftType {
    code: String
  }

  type OfferOperatingType {
    carrierCode: String
  }

  type OfferPriceType {
    currency: String
    total: String
    base: String
    fees: [OfferFeesType]
    grandTotal: String
    billingCurrency: String
  }

  type OfferFeesType {
    amount: String
    type: String
  }

  type OfferPricingOptions {
    fareType: [String]
    includedCheckedBagsOnly: Boolean
  }

  type OfferTravelerPricings {
    travelerId: ID
    fareOption: String
    travelerType: String
    price: OfferTravelerPriceType
    fareDetailsBySegment: [OfferFareDetailsBySegment]
  }

  type OfferTravelerPriceType {
    currency: String
    total: String
    base: String
    taxes: [OfferTaxesType]
  }

  type OfferTaxesType {
    amount: String
    code: String
  }

  type OfferFareDetailsBySegment {
    segmentId: String
    cabin: String
    fareBasis: String
    class: String
    includedCheckedBags: OfferIncludedCheckedBags
  }

  type OfferIncludedCheckedBags {
    quantity: Int
  }

  type OfferDictionariesType {
    locations: OfferDictionariesLocation
  }

  type OfferDictionariesLocation {
    MAD: OfferLocationType
    GIG: OfferLocationType
    CMN: OfferLocationType
  }

  type OfferLocationType {
    cityCode: String
    countryCode: String
  }
`;

module.exports = checkOffer;
