const { gql } = require("apollo-server-express");

const tourDetails = gql`
  extend type Query {
    TourDetails(id: ID!): TourDetailsResult
    getDatabaseTours: [DatabaseToursResult]
  }

  extend type Mutation {
    removeTour(id: ID!): Boolean
  }

  type TourDetailsResult {
    id: String
    href: String
    name: String
    slug: String
    product_line: String
    departures_start_date: String
    departures_end_date: String
    description: String
    booking_companies: [HrefType]
    structured_itineraries: [StructuredItinerariesType]
    details: [DetailsType]
    advertised_departures: [AdvertisedDepartures]
    geography: GeographyType
    images: [ImageType]
    site_links: [SiteLink]
    tour: HrefType
    departures: DeparturesType
  }

  type HrefType {
    id: ID
    href: String
  }

  type StructuredItinerariesType {
    id: ID
    variation_id: ID
    href: String
    valid_during_ranges: [ValidDuringRanges]
  }

  type ValidDuringRanges {
    start_date: String
    end_date: String
  }

  type DetailsType {
    body: String
    detail_type: DetailType
  }

  type DetailType {
    id: ID
    label: String
  }

  type AdvertisedDepartures {
    room: String
    departure: HrefType
    previous_amount: String
    currency: String
    amount: String
    promotion: NameType
  }

  type NameType {
    id: ID
    href: String
    name: String
  }

  type GeographyType {
    region: RegionType
    primary_country: NameType
    start_country: NameType
    finish_country: NameType
    visited_countries: [NameType]
    start_city: NameType
    finish_city: NameType
  }

  type RegionType {
    id: ID
    name: String
  }
  type ImageType {
    type: String
    image_href: String
  }

  type SiteLink {
    type: String
    href: String
  }

  type DeparturesType {
    href: String
  }

  type DatabaseToursResult {
    id: ID
    name: String
    slug: String
    description: String
    details: [DetailsType]
    advertised_departures: [AdvertisedDepartures]
    images: [ImageType]
    site_links: [SiteLink]
    geography: DatabaseGeographyType
  }

  type DatabaseGeographyType {
    primary_country: NameType
    visited_countries: [NameType]
  }
`;

module.exports = tourDetails;
