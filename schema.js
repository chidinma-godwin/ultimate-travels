// import required packages
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} = graphql;
const axios = require("axios");
const qs = require('qs');

// import required files
const { rapidapi } = require("./config/keys");

const PlaceType = new GraphQLObjectType({
  name: "Place",
  fields: () => ({
    PlaceId: { type: GraphQLString },
    PlaceName: { type: GraphQLString },
    CountryId: { type: GraphQLString },
    RegionId: { type: GraphQLString },
    CityId: { type: GraphQLString },
    CountryName: { type: GraphQLString }
  })
});

const CreateSessionType = new GraphQLObjectType({
  name: "CreateSession",
  fields: () => ({
    _: { type: GraphQLBoolean }
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
              'content-type': 'application/x-www-form-urlencoded',
              'x-rapidapi-host': rapidapi.host,
              'x-rapidapi-key': rapidapi.secretKey
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
            return response
          })
          .catch(error => {
            console.log(error.response);
          });
          return results.headers.location;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
