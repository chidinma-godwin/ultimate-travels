// import required package
const axios = require("axios");
const getToken = require("../amadeusToken");

const placesResolver = {
  Query: {
    places: async (root, args, context, info) => {
      let token = await getToken();
      return axios({
        method: "GET",
        url: "https://test.api.amadeus.com/v1/reference-data/locations",
        headers: {
          //   "content-type": "application/vnd.amadeus+json",
          Authorization: `Bearer ${token}`
        },
        params: {
          subType: "AIRPORT,CITY",
          keyword: args.keyword,
          view: "LIGHT"
        }
      })
        .then(res => {
          return res.data.data;
        })
        .catch(async error => {
          token = await getToken();
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
    }
  }
};

module.exports = placesResolver;
