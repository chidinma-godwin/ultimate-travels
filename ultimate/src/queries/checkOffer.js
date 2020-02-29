import gql from "graphql-tag";

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

export default checkOfferQuery;
