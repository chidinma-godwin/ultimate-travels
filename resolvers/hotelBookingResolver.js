const axios = require("axios");
const qs = require("qs");
const util = require("util");

const hotelBookingResolver = {
  Query: {
    hotelBooking: (root, args, context, info) => {
      return axios({
        method: "POST",
        url: "https://api.amadeus.com/v1/booking/hotel-bookings",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: qs.stringify(args.input),
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

module.exports = hotelBookingResolver;
