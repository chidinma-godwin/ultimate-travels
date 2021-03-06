// import required package
const axios = require("axios");
const util = require("util");

const flightResolver = {
  Query: {
    flightDetails: (roots, args, { token }, info) => {
      return axios({
        method: "GET",
        url: "https://api.amadeus.com/v2/shopping/flight-offers",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          destinationLocationCode: args.destinationLocationCode,
          originLocationCode: args.originLocationCode,
          departureDate: args.departureDate,
          returnDate: args.returnDate,
          adults: args.adults,
          children: args.children,
          infants: args.infants,
          travelClass: args.travelClass,
          includeAirlineCodes: args.includeAirlineCodes,
          excludeAirlineCodes: args.excludeAirlineCodes,
          nonStop: args.nonStop,
          currencyCode: args.currencyCode,
        },
      })
        .then((response) => {
          let carriers = response.data.dictionaries.carriers;
          let carriersArray = [];
          for (let i in carriers) carriersArray.push([i, carriers[i]]);
          response.data.dictionaries.carriers = carriersArray;
          return response.data;
        })
        .catch((error) => {
          if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            // TODO: Use sentry for error notification
            console.log(error.response.data);
          } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
          } else {
            // Something happened in setting up the request and triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
          //res.send(error.request);
        });
    },
  },
};

module.exports = flightResolver;
