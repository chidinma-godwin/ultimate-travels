// import required packages
const axios = require("axios");
const qs = require("qs");

// import required files
const { rapidapi } = require("../config/keys");

const sessionResolver = {
  Query: {
    createSession: (root, args, context, info) => {
      return axios({
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
          console.log(response.headers.location);
          context.res = response.headers;
          return response;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};

module.exports = sessionResolver;
