const router = require("express").Router();
const axios = require("axios");
const qs = require("qs");

router.post("/", (req, res) => {
  const {
    inboundDate,
    cabinClass,
    children,
    infants,
    country,
    currency,
    locale,
    originPlace,
    destinationPlace,
    outboundDate,
    adults,
    groupPricing,
  } = req.body;
  axios
    .post(
      "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0",
      qs.stringify({
        inboundDate,
        cabinClass,
        children,
        infants,
        country,
        currency,
        locale,
        originPlace,
        destinationPlace,
        outboundDate,
        adults,
        groupPricing,
      }),
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Origin": "*",
          "x-rapidapi-host":
            "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "0c514d99b0mshbd049a32f91e13fp154323jsn1ac37a3785c9",
        },
      }
    )
    .then((response) => {
      res.send(response.headers.location);
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
});

module.exports = router;
