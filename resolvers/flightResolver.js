// import required package
const axios = require("axios");

// import required files
const { rapidapi } = require("../config/keys");

const flightResolver = {
  Query: {
    flightDetails: (roots, args, context, info) => {
      return axios({
        method: "GET",
        url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/%7B${args.sessionKey}%7D`,
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": rapidapi.host,
          "x-rapidapi-key": rapidapi.secretKey
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
    }
  }
};

module.exports = flightResolver;
