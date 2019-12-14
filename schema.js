// import required packages
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLID
} = graphql;
const axios = require("axios");
const qs = require("qs");

// import required files
const { rapidapi } = require("./config/keys");

const PlaceType = new GraphQLObjectType({
  name: "Place",
  fields: () => ({
    PlaceId: { type: GraphQLID },
    PlaceName: { type: GraphQLString },
    CountryId: { type: GraphQLString },
    RegionId: { type: GraphQLString },
    CityId: { type: GraphQLString },
    CountryName: { type: GraphQLString }
  })
});

const FlightNumberType = new GraphQLObjectType({
  name: "FlightNumber",
  fields: () => ({
    FlightNumber: { type: GraphQLString },
    CarrierId: { type: GraphQLInt }
  })
});

const PollQueryType = new GraphQLObjectType({
  name: "PollQuery",
  fields: () => ({
    Country: { type: GraphQLString },
    Currency: { type: GraphQLString },
    Locale: { type: GraphQLString },
    Adults: { type: GraphQLInt },
    Children: { type: GraphQLInt },
    Infants: { type: GraphQLInt },
    OriginPlace: { type: GraphQLString },
    DestinationPlace: { type: GraphQLString },
    OutboundDate: { type: GraphQLString },
    LocationSchema: { type: GraphQLString },
    CabinClass: { type: GraphQLString },
    GroupPricing: { type: GraphQLBoolean }
  })
});

const PricingType = new GraphQLObjectType({
  name: "Pricing",
  fields: () => ({
    Agents: { type: new GraphQLList(GraphQLInt) },
    QuoteAgeInMinutes: { type: GraphQLInt },
    Price: { type: GraphQLFloat },
    DeeplinkUrl: { type: GraphQLString }
  })
});

const BookingDetailsType = new GraphQLObjectType({
  name: "BookingDetails",
  fields: () => ({
    Uri: { type: GraphQLString },
    Body: { type: GraphQLString },
    Method: { type: GraphQLString }
  })
});

const ItinarariesType = new GraphQLObjectType({
  name: "ItinarariesType",
  fields: () => ({
    OutboundLegId: { type: GraphQLString },
    PricingOptions: { type: new GraphQLList(PricingType) },
    BookingDetailsLink: { type: BookingDetailsType }
  })
});

const LegsType = new GraphQLObjectType({
  name: "Leg",
  fields: () => ({
    Id: { type: GraphQLID },
    SegmentIds: { type: new GraphQLList(GraphQLInt) },
    OriginStation: { type: GraphQLInt },
    DestinationStation: { type: GraphQLInt },
    Departure: { type: GraphQLString },
    Arrival: { type: GraphQLString },
    Duration: { type: GraphQLInt },
    JourneyMode: { type: GraphQLString },
    Stops: { type: new GraphQLList(GraphQLInt) },
    Carriers: { type: new GraphQLList(GraphQLInt) },
    OperatingCarriers: { type: new GraphQLList(GraphQLInt) },
    Directionality: { type: GraphQLString },
    FlightNumbers: { type: new GraphQLList(FlightNumberType) }
  })
});

const SegmentsType = new GraphQLObjectType({
  name: "Segment",
  fields: () => ({
    Id: { type: GraphQLID },
    OriginStation: { type: GraphQLInt },
    DestinationStation: { type: GraphQLInt },
    DepartureDateTime: { type: GraphQLString },
    ArrivalDateTime: { type: GraphQLString },
    Carrier: { type: GraphQLInt },
    OperatingCarrier: { type: GraphQLInt },
    Duration: { type: GraphQLInt },
    FlightNumber: { type: GraphQLString },
    JourneyMode: { type: GraphQLString },
    Directionality: { type: GraphQLString }
  })
});

const CarriersType = new GraphQLObjectType({
  name: "Carrier",
  fields: () => ({
    Id: { type: GraphQLID },
    Code: { type: GraphQLString },
    Name: { type: GraphQLString },
    ImageUrl: { type: GraphQLString },
    DisplayCode: { type: GraphQLString }
  })
});

const AgentsType = new GraphQLObjectType({
  name: "Agent",
  fields: () => ({
    Id: { type: GraphQLID },
    Name: { type: GraphQLString },
    ImageUrl: { type: GraphQLString },
    Status: { type: GraphQLString },
    OptimisedForMobile: { type: GraphQLBoolean },
    Type: { type: GraphQLString }
  })
});

const AirportCityType = new GraphQLObjectType({
  name: "AirportCity",
  fields: () => ({
    Id: { type: GraphQLInt },
    ParentId: { type: GraphQLInt },
    Code: { type: GraphQLString },
    Type: { type: GraphQLString },
    Name: { type: GraphQLString }
  })
});

const CurrencyType = new GraphQLObjectType({
  name: "Currency",
  fields: () => ({
    Code: { type: GraphQLString },
    Symbol: { type: GraphQLString },
    ThousandsSeparator: { type: GraphQLString },
    DecimalSeparator: { type: GraphQLString },
    SymbolOnLeft: { type: GraphQLBoolean },
    SpaceBetweenAmountAndSymbol: { type: GraphQLBoolean },
    RoundingCoefficient: { type: GraphQLInt },
    DecimalDigits: { type: GraphQLInt }
  })
});

const CreateSessionType = new GraphQLObjectType({
  name: "CreateSession",
  fields: () => ({
    _: { type: GraphQLBoolean }
  })
});

const PollResultsType = new GraphQLObjectType({
  name: "PollResults",
  fields: () => ({
    SessionKey: { type: GraphQLString },
    Query: { type: PollQueryType },
    Status: { type: GraphQLString },
    Itineraries: { type: new GraphQLList(ItinarariesType) },
    Legs: { type: new GraphQLList(LegsType) },
    Segments: { type: new GraphQLList(SegmentsType) },
    Carriers: { type: new GraphQLList(CarriersType) },
    Agents: { type: new GraphQLList(AgentsType) },
    Places: { type: new GraphQLList(AirportCityType) },
    Currencies: { type: new GraphQLList(CurrencyType) }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    places: {
      type: new GraphQLList(PlaceType),
      args: { search: { type: GraphQLString } },
      resolve(parent, args) {
        // let response;
        return axios({
          method: "GET",
          url:
            "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/NG/NGN/en-GB/",
          headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": rapidapi.host,
            "x-rapidapi-key": rapidapi.secretKey
          },
          params: {
            query: args.search
          }
        })
          .then(res => {
            return res.data.Places;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    createSession: {
      type: CreateSessionType,
      args: {
        cabinClass: { type: GraphQLString },
        children: { type: GraphQLString },
        infants: { type: GraphQLString },
        country: { type: GraphQLString },
        currency: { type: GraphQLString },
        locale: { type: GraphQLString },
        originPlace: { type: GraphQLString },
        destinationPlace: { type: GraphQLString },
        outboundDate: { type: GraphQLString },
        adults: { type: GraphQLString }
      },
      async resolve(parentValue, args) {
        const results = await axios({
          method: "POST",
          url:
            "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0/",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "x-rapidapi-host": rapidapi.host,
            "x-rapidapi-key": rapidapi.secretKey
          },
          data: qs.stringify({
            cabinClass: args.cabinClass,
            children: args.children,
            infants: args.infants,
            country: args.country,
            currency: args.currency,
            locale: args.locale,
            originPlace: args.originPlace,
            destinationPlace: args.destinationPlace,
            outboundDate: args.outboundDate,
            adults: args.adults
          })
        })
          .then(response => {
            return response;
          })
          .catch(error => {
            console.log(error.response);
          });
        console.log(results.headers.location);
        return results.headers.location;
      }
    },
    poll: {
      type: PollResultsType,
      args: { sessionKey: { type: GraphQLString } },
      async resolve(parent, args) {
        const res = await axios({
          method: "GET",
          url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/%7B${args.sessionKey}%7D`,
          headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host":
              "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key":
              "0c514d99b0mshbd049a32f91e13fp154323jsn1ac37a3785c9"
          },
          params: {
            pageIndex: "0",
            pageSize: "10"
          }
        })
          .then(response => {
            console.log(response.data);
            return response.data;
          })
          .catch(error => {
            console.log(error);
          });
      return res;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
