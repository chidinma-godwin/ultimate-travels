const { gql } = require("apollo-server-express");

const hotels = gql`
  extend type Query {
    hotels(
      cityCode: String!
      checkInDate: String
      checkOutDate: String
      roomQuantity: Int
      adults: Int
      hotelName: String
      currency: String
    ): HotelsListType
  }

  extend type Query {
    hotelOffers(
      hotelId: String!
      checkInDate: String
      checkOutDate: String
      roomQuantity: Int
      adults: Int
      hotelName: String
      currency: String
    ): HotelOfferListType
  }

  type HotelOfferListType {
    data: HotelOfferType
  }

  type HotelsListType {
    data: [HotelOfferType]
    meta: HotelMetaType
  }

  type HotelOfferType {
    type: String
    hotel: HotelType
    available: Boolean
    offers: [HotelOffers]
    self: String
  }

  type HotelType {
    type: String
    hotelId: String
    chainCode: String
    dupeId: String
    name: String
    rating: String
    latitude: Float
    longitude: Float
    hotelDistance: HotelDistanceType
    address: HotelAddressType
    contact: HotelContactPrice
    description: DescriptionType
    amenities: [String]
    media: [HotelMediaType]
  }

  type DescriptionType {
    lang: String
    text: String
  }

  type HotelDistanceType {
    distance: Float
    distanceUnit: String
  }

  type HotelAddressType {
    lines: [String]
    postalCode: String
    cityName: String
    countryCode: String
  }

  type HotelContactPrice {
    phone: String
    fax: String
    email: String
  }

  type HotelMediaType {
    uri: String
    category: String
  }

  type HotelOffers {
    id: ID
    rateCode: String
    description: DescriptionType
    boardType: String
    room: HotelRoomType
    guests: GuestsType
    price: HotelPriceType
    self: String
  }

  type HotelRoomType {
    type: String
    typeEstimated: TypeEstimatedType
    description: HotelRoomDescription
  }

  type TypeEstimatedType {
    category: String
    beds: Int
    bedType: String
  }

  type GuestsType {
    adults: Int
  }

  type HotelPriceType {
    currency: String
    base: String
    total: String
    variations: PriceVariationsType
    changes: [PriceChangesType]
  }

  type PriceVariationsType {
    average: AveragePriceVariationsType
  }

  type AveragePriceVariationsType {
    total: String
  }

  type PriceChangesType {
    startDate: String
    endDate: String
    total: String
  }

  type HotelRoomDescription {
    lang: String
    text: String
  }

  type HotelMetaType {
    links: HotelMetaLink
  }

  type HotelMetaLink {
    next: String
  }
`;

module.exports = hotels;
