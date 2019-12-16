import { gql } from "apollo-boost";

const getPlacesQuery = gql`
  query($search: String) {
    places(search: $search) {
      PlaceId
      PlaceName
      CityId
    }
  }
`;

const getSessionKey = gql`
  query(
    $cabinClass: String!
    $children: String
    $infants: String
    $country: String!
    $currency: String!
    $locale: String!
    $originPlace: String!
    $destinationPlace: String!
    $outboundDate: String!
    $adults: String!
  ) {
    createSession(
      cabinClass: $cabinClass
      children: $children
      infants: $infants
      country: $country
      currency: $currency
      locale: $locale
      originPlace: $originPlace
      destinationPlace: $destinationPlace
      outboundDate: $outboundDate
      adults: $adults
    ) {
      _
    }
  }
`;

export { getPlacesQuery, getSessionKey };
