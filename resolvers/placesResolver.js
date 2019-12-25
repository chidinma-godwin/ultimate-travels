// import required package
const axios = require("axios");

// import required files
const { rapidapi } = require("../config/keys");

const placesResolver = {
  Query: {
    places: (root, args) => {
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
};

module.exports = placesResolver;