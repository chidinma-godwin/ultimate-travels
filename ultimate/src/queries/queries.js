import gql from "graphql-tag";

const getPlacesQuery = gql`
  query($search: String!) {
    places(search: $search) {
      PlaceId
      PlaceName
      CityId
    }
  }
`;

const getFlightDetails = gql`
  query($sessionKey: String!) {
    flightDetails(sessionKey: $sessionKey) {
      Status
      Itineraries {
        OutboundLegId
        PricingOptions {
          Agents
          QuoteAgeInMinutes
          Price
          DeeplinkUrl
        }
        BookingDetailsLink {
          Uri
          Body
          Method
        }
      }
      Legs {
        Id
        SegmentIds
        OriginStation
        DestinationStation
        Departure
        Arrival
        Duration
        JourneyMode
        Stops
        Carriers
        OperatingCarriers
        Directionality
        FlightNumbers {
          FlightNumber
          CarrierId
        }
      }
      Segments {
        Id
        OriginStation
        DestinationStation
        DepartureDateTime
        ArrivalDateTime
        Carrier
        OperatingCarrier
        Duration
        FlightNumber
        JourneyMode
        Directionality
      }
      Carriers {
        Id
        Code
        Name
        ImageUrl
        DisplayCode
      }
      Agents {
        Id
        Name
        ImageUrl
        Status
        OptimisedForMobile
        Type
      }
      Places {
        Id
        ParentId
        Code
        Type
        Name
      }
      Currencies {
        Code
        Symbol
        ThousandsSeparator
        DecimalSeparator
        SymbolOnLeft
        SpaceBetweenAmountAndSymbol
        RoundingCoefficient
        DecimalDigits
      }
    }
  }
`;

export { getPlacesQuery, getFlightDetails };
