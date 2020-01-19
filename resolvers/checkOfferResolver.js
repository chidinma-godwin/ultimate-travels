const axios = require("axios");
const qs = require("qs");

const getToken = require("../amadeusToken");

const checkOfferResolver = {
  Query: {
    checkOffer: async (roots, args, context, info) => {
      let token = await getToken();
      return axios({
        method: "POST",
        url: "https://test.api.amadeus.com/v1/shopping/flight-offers/pricing",
        headers: {
          authorization: `Bearer ${token}`
          // "content-type": "application/json"
        },
        data: args.input
      })
        .then(res => {
          console.log(res.data);
          return res.data;
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
        });
    }
  }
};

module.exports = checkOfferResolver;