const { gql } = require("apollo-server-express");

const addTourToDatabase = gql`
  extend type Mutation {
    saveTour(input: [TourInput]): SaveTourResponse!
  }

  input TourInput {
    id: String
    name: String
    slug: String
    description: String
    details: [DetailsInput]
    advertised_departures: [AdvertisedDeparturesInput]
    geography: GeographyInput
    images: [ImageInput]
    site_links: [SiteLinkInput]
  }

  input HrefInput {
    id: ID
    href: String
  }

  input DetailsInput {
    body: String
    detail_type: DetailTypeInput
  }

  input DetailTypeInput {
    id: ID
    label: String
  }

  input AdvertisedDeparturesInput {
    room: String
    departure: HrefInput
    previous_amount: String
    currency: String
    amount: String
    promotion: NameInput
  }

  input NameInput {
    id: ID
    href: String
    name: String
  }

  input GeographyInput {
    region: RegionInput
    primary_country: NameInput
    start_country: NameInput
    finish_country: NameInput
    visited_countries: [NameInput]
    start_city: NameInput
    finish_city: NameInput
  }

  input RegionInput {
    id: ID
    name: String
  }
  input ImageInput {
    type: String
    image_href: String
  }

  input SiteLinkInput {
    type: String
    href: String
  }

  type SaveTourResponse {
    ok: Boolean!
  }
`;

module.exports = addTourToDatabase;
