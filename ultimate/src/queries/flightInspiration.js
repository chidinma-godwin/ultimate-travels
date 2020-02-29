import gql from "graphql-tag";

const getInspirationPlaces = gql`
  query($origin: String, $departureDate: String, $viewBy: String) {
    flightInspiration(
      origin: $origin
      departureDate: $departureDate
      viewBy: $viewBy
    ) {
      meta {
        currency
        defaults {
          departureDate
          viewBy
        }
      }
      data {
        type
        origin
        destination
        departureDate
        returnDate
        price {
          total
        }
        links {
          flightDates
          flightOffers
        }
      }
      dictionaries {
        currencies
        locations {
          id
          details {
            subType
            detailedName
          }
        }
      }
    }
  }
`;

export default getInspirationPlaces;
