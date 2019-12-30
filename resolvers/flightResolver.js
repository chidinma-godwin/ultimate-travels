// import required package
const axios = require("axios");

// import required files
const { rapidapi } = require("../config/keys");

const flightResolver = {
  Query: {
    flightDetails: (roots, args, context, info) => {
      return axios({
        method: "GET",
        url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/%7B${args.sessionKey}%7D`,
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": rapidapi.host,
          "x-rapidapi-key": rapidapi.secretKey
        },
        params: {
          pageIndex: "0",
          pageSize: "10"
        }
      })
        .then(response => {
          console.log(response.data);
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

module.exports = flightResolver;
