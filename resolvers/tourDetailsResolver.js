const util = require("util");
const axios = require("axios");
const Tours = require("../models/tour");

const tourDetailsResolver = {
  Query: {
    TourDetails: (root, { id }, context, info) => {
      return axios({
        method: "GET",
        url: `https://rest.gadventures.com//tour_dossiers/${id}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "X-Application-Key": process.env.X_Application_Key
        }
      })
        .then(response => {
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
    },
    getDatabaseTours: (root, args, context, info) => Tours.find({})
  },
  Mutation: {
    saveTour: (parent, { input }, context, info) => {
      console.log(input, util.inspect(input, { depth: 10 }));
      try {
        Tours.create(input);
        return {
          ok: true
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false
        };
      }
    }
  }
};

module.exports = tourDetailsResolver;
