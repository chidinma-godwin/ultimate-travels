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
  query(
    $sessionKey: String!
    $sortType: String
    $sortOrder: String
    $duration: Int
    $includeCarriers: String
    $excludeCarriers: String
    $originAirports: String
    $destinationAirports: String
    $stops: String
    $outboundDepartTime: String
    $outboundDepartStartTime: String
    $outboundDepartEndTime: String
    $outboundArriveStartTime: String
    $outboundArriveEndTime: String
    $inboundDepartTime: String
    $inboundDepartStartTime: String
    $inboundDepartEndTime: String
    $inboundArriveStartTime: String
    $inboundArriveEndTime: String
    $pageIndex: String
    $pageSize: String
  ) {
    flightDetails(
      sessionKey: $sessionKey
      sortType: $sortType
      sortOrder: $sortOrder
      duration: $duration
      includeCarriers: $includeCarriers
      excludeCarriers: $excludeCarriers
      originAirports: $originAirports
      destinationAirports: $destinationAirports
      stops: $stops
      outboundDepartTime: $outboundDepartTime
      outboundDepartStartTime: $outboundDepartStartTime
      outboundDepartEndTime: $outboundDepartEndTime
      outboundArriveStartTime: $outboundArriveStartTime
      outboundArriveEndTime: $outboundArriveEndTime
      inboundDepartTime: $inboundDepartTime
      inboundDepartStartTime: $inboundDepartStartTime
      inboundDepartEndTime: $inboundDepartEndTime
      inboundArriveStartTime: $inboundArriveStartTime
      inboundArriveEndTime: $inboundArriveEndTime
      pageIndex: $pageIndex
      pageSize: $pageSize
    ) {
      Status
      Itineraries {
        OutboundLegId
        InboundLegId
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
