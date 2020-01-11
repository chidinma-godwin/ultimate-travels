const axios = require("axios");
const qs = require("qs");

const getToken = () => {
  return axios({
    method: "POST",
    url: "https://test.api.amadeus.com/v1/security/oauth2/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: qs.stringify({
      client_id: "GdnWPDfUYUTnxcmAdupVU9z6a7CRB8PV",
      client_secret: "3PBb6Z1fGccPfvTF",
      grant_type: "client_credentials"
    })
  })
    .then(res => {
      return res.data.access_token;
    })
    .catch(err => console.log(err));
};

module.exports = getToken;
