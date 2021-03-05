const axios = require("axios");
const util = require("util");

const hotelsResolver = {
  Query: {
    hotels: (root, args, { token }, info) => {
      return axios({
        method: "Get",
        url: "https://api.amadeus.com/v2/shopping/hotel-offers",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          cityCode: args.cityCode,
          checkInDate: args.checkInDate,
          checkOutDate: args.checkOutDate,
          roomQuantity: args.roomQuantity,
          adults: args.adults,
          hotelName: args.hotelName,
          currency: args.currency,
        },
      })
        .then((response) => {
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

    hotelOffers: async (root, args, { token }, info) => {
      return axios({
        method: "Get",
        url: "https://api.amadeus.com/v2/shopping/hotel-offers/by-hotel",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          hotelId: args.hotelId,
          checkInDate: args.checkInDate,
          checkOutDate: args.checkOutDate,
          roomQuantity: args.roomQuantity,
          adults: args.adults,
          currency: args.currency,
        },
      })
        .then((response) => {
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

module.exports = hotelsResolver;
