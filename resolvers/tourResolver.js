const util = require("util");
const axios = require("axios");
const { requireAdminAuth } = require("../auth");

const tourResolver = {
  Query: {
    Tour: requireAdminAuth((root, { name, page }, context, info) => {
      console.log("hey");
      console.log(context.req.sessionID);

      return axios({
        method: "GET",
        url: `https://rest.gadventures.com/tour_dossiers?name=${name}&page=${page}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "X-Application-Key": process.env.X_Application_Key,
        },
      })
        .then((response) => {
          console.log(
            response.data,
            util.inspect(response.data, { depth: 10 })
          );
          return response.data;
        })
        .catch((error) => {
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
          //res.send(error.request);
        });
    }),
  },
};

module.exports = tourResolver;
