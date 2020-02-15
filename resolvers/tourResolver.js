const util = require("util");
const axios = require("axios");

const tourResolver = {
  Query: {
    Tour: (root, args, context, info) => {
      return axios({
        method: "GET",
        url: "https://rest.gadventures.com/tour_dossiers/None",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "X-Application-Key": "test_bf512a4d633d404959a4d7a8ecd8bfa1929c7483"
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
          //res.send(error.request);
        });
    }
  }
};

module.exports = tourResolver;
