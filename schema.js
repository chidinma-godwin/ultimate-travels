// import required packages
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} = graphql;
const axios = require("axios");

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
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
