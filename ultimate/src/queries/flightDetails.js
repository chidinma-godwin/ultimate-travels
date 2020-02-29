import gql from "graphql-tag";

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
        type
        id
        source
        instantTicketingRequired
        nonHomogeneous
        oneWay
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
              terminal
              at
            }
            carrierCode
            number
            aircraft {
              code
            }
            operating {
              carrierCode
            }
            id
            numberOfStops
            blacklistedInEU
          }
        }
        price {
          currency
          grandTotal
          total
          base
          fees {
            amount
            type
          }
        }
        pricingOptions {
          fareType
          includedCheckedBagsOnly
        }
        validatingAirlineCodes
        travelerPricings {
          travelerId
          fareOption
          travelerType
          associatedAdultId
          price {
            currency
            total
            base
          }
          fareDetailsBySegment {
            segmentId
            cabin
            fareBasis
            class
            includedCheckedBags {
              quantity
            }
          }
        }
      }
      dictionaries {
        carriers
      }
    }
  }
`;

export default getFlightDetails;
