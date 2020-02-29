import gql from "graphql-tag";

const getHotels = gql`
  query(
    $cityCode: String!
    $checkInDate: String
    $checkOutDate: String
    $roomQuantity: Int
    $adults: Int
    $hotelName: String
  ) {
    hotels(
      cityCode: $cityCode
      checkInDate: $checkInDate
      checkOutDate: $checkOutDate
      roomQuantity: $roomQuantity
      adults: $adults
      hotelName: $hotelName
    ) {
      data {
        type
        hotel {
          hotelId
          name
          rating
          hotelDistance {
            distance
            distanceUnit
          }
          address {
            lines
            cityName
          }
          contact {
            phone
            fax
            email
          }
          description {
            lang
            text
          }
          amenities
          media {
            uri
            category
          }
        }
        available
        offers {
          id
          rateCode
          description {
            lang
            text
          }
          boardType
          room {
            type
            typeEstimated {
              category
            }
            description {
              lang
              text
            }
          }
          guests {
            adults
          }
          price {
            currency
            total
            variations {
              average {
                total
              }
            }
            changes {
              startDate
              endDate
              total
            }
          }
          # policies{
          #   guarantee{
          #     creditCards
          #     methods
          #   }
          #   paymentType
          #   cancellation{
          #     numberOfNights
          #     deadline
          #   }
          # }
        }
        self
      }
      meta {
        links {
          next
        }
      }
    }
  }
`;

const getHotelOffers = gql`
  query(
    $hotelId: String!
    $checkInDate: String
    $checkOutDate: String
    $roomQuantity: Int
    $adults: Int
  ) {
    hotelOffers(
      hotelId: $hotelId
      checkInDate: $checkInDate
      checkOutDate: $checkOutDate
      roomQuantity: $roomQuantity
      adults: $adults
    ) {
      data {
        type
        hotel {
          hotelId
          name
          rating
          hotelDistance {
            distance
            distanceUnit
          }
          address {
            postalCode
            lines
            cityName
          }
          contact {
            phone
            fax
            email
          }
          description {
            lang
            text
          }
          amenities
          media {
            uri
            category
          }
        }
        available
        offers {
          id
          rateCode
          description {
            lang
            text
          }
          boardType
          room {
            type
            typeEstimated {
              category
            }
            description {
              lang
              text
            }
          }
          guests {
            adults
          }
          price {
            currency
            total
            variations {
              average {
                total
              }
            }
            changes {
              startDate
              endDate
              total
            }
          }
          self
        }
      }
    }
  }
`;

export { getHotels, getHotelOffers };
