const util = require("util");
const axios = require("axios");
const Tours = require("../models/tour");
const { requireAdminAuth } = require("../auth");

const tourDetailsResolver = {
  Query: {
    TourDetails: requireAdminAuth((root, { id }, context, info) => {
      return axios({
        method: "GET",
        url: `https://rest.gadventures.com//tour_dossiers/${id}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "X-Application-Key": process.env.X_Application_Key,
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
        });
    }),
    getDatabaseTours: (root, args, context, info) => {
      console.log(context.req.sessionID);
      return Tours.find({});
    },
  },
  Mutation: {
    saveTour: requireAdminAuth((parent, { input }, context, info) => {
      try {
        Tours.create(input);
        return {
          ok: true,
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
        };
      }
    }),
    removeTour: requireAdminAuth((parent, { id }, context, info) => {
      try {
        Tours.deleteOne({ id }, function (err) {});
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }),
  },
};

module.exports = tourDetailsResolver;
