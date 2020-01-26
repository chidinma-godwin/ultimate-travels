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

const checkOfferQuery = gql`
  query($input: OfferInput) {
    checkOffer(input: $input) {
      warnings {
        code
        title
        detail
        status
      }
      data {
        flightOffers {
          id
          instantTicketingRequired
          lastTicketingDate
          itineraries {
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
              duration
            }
          }
          price {
            currency
            total
            base
            fees {
              amount
              type
            }
            grandTotal
            billingCurrency
          }
          travelerPricings {
            travelerId
            fareOption
            travelerType
            price {
              currency
              total
              base
              taxes {
                amount
              }
              refundableTaxes
            }
          }
        }
      }
    }
  }
`;

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

const getTravelers = gql`
  query {
    allTravelers {
      id
      firstName
      middleName
      lastName
      dateOfBirth
      title
      email
      phone
      createdAt
    }
  }
`;

const addTraveler = gql`
  mutation addTraveler($input: TravelerInfo!) {
    addTraveler(input: $input) {
      id
      firstName
      middleName
      lastName
      dateOfBirth
      title
      email
      phoneNum
      createdAt
    }
  }
`;

const getVisaRequests = gql`
  query {
    allVisaRequest {
      id
      firstName
      middleName
      lastName
      title
      gender
      dateOfBirth
      status
      phone
      nationality
      employmentStatus
      address
      departureDate
      returnDate
      travelHistory
      destination
      passportExpiryDate
      passportNum
      createdAt
    }
  }
`;

const addVisaRequest = gql`
  mutation addVisaRequest($input: VisaRequestInfo!) {
    addVisaRequest(input: $input) {
      id
      firstName
      middleName
      lastName
      title
      gender
      dateOfBirth
      status
      phoneNum
      email
      nationality
      employmentStatus
      address
      departureDate
      returnDate
      travelHistory
      destination
      passportExpiryDate
      passportNum
      createdAt
    }
  }
`;

export {
  getPlacesQuery,
  getFlightDetails,
  checkOfferQuery,
  getInspirationPlaces,
  getTravelers,
  addTraveler,
  addVisaRequest,
  getVisaRequests
};
