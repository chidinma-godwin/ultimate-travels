import gql from "graphql-tag";

const getPlacesQuery = gql`
  query($keyword: String!) {
    places(keyword: $keyword) {
      subType
      name
      id
      iataCode
      address {
        cityName
        countryName
      }
    }
  }
`;

const getFlightDetails = gql`
  query(
    $originLocationCode: String
    $destinationLocationCode: String
    $departureDate: String
    $returnDate: String
    $adults: Int
    $children: Int
    $infants: Int
    $travelClass: String
    $includeAirlineCodes: String
    $excludeAirlineCodes: String
    $nonStop: String
    $currencyCode: String
    $max: Int
  ) {
    flightDetails(
      originLocationCode: $originLocationCode
      destinationLocationCode: $destinationLocationCode
      departureDate: $departureDate
      returnDate: $returnDate
      adults: $adults
      children: $children
      infants: $infants
      travelClass: $travelClass
      includeAirlineCodes: $includeAirlineCodes
      excludeAirlineCodes: $excludeAirlineCodes
      nonStop: $nonStop
      currencyCode: $currencyCode
      max: $max
    ) {
      data {
        id
        instantTicketingRequired
        lastTicketingDate
        numberOfBookableSeats
        itineraries {
          duration
          segments {
            departure {
              iataCode
              at
            }
            arrival {
              iataCode
              at
            }
            id
            numberOfStops
            carrierCode
          }
        }
        price {
          total
        }
      }
      dictionaries {
        carriers
      }
    }
  }
`;

export { getPlacesQuery, getFlightDetails };
