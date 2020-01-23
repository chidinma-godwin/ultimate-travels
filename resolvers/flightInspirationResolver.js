// import required package
const axios = require("axios");
const util = require("util");

// import required files
const getToken = require("../amadeusToken");

const flightInspirationResolver = {
  Query: {
    flightInspiration: async (root, args, context, info) => {
      let token = await getToken();

      return axios({
        method: "Get",
        url: "https://test.api.amadeus.com/v1/shopping/flight-destinations",
        headers: {
          AUTHORIZATION: `Bearer ${token}`
        },
        params: {
          origin: args.origin,
          departureDate: args.departureDate,
          viewBy: args.viewBy
        }
      })
        .then(response => {
          // format the currency data from the api to an array
          let currencies = response.data.dictionaries.currencies;
          let currenciesArray = [];
          for (let i in currencies) currenciesArray.push([i, currencies[i]]);
          response.data.dictionaries.currencies = currenciesArray;

          // format the location data from the api to an array
          let locations = response.data.dictionaries.locations;
          let locationsArray = [];
          for (let i in locations) locationsArray.push([i, locations[i]]);
          response.data.dictionaries.locations = locationsArray;
          console.log(
            response.data,
            util.inspect(response.data, { depth: 10 })
          );
          return response.data;
        })
        .catch(error => {
          if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            let checkToken = async () => {
              token = await getToken();
            };
            if (error.response.status == 401) checkToken();
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
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
    }
  }
};

module.exports = flightInspirationResolver;
