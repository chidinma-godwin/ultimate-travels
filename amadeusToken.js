const axios = require("axios");
const qs = require("qs");

const getToken = () => {
  return axios({
    method: "POST",
    url: "https://api.amadeus.com/v1/security/oauth2/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: qs.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: process.env.GRANT_TYPE
    })
  })
    .then(res => {
      return res.data.access_token;
    })
    .catch(err => console.log(err));
};

module.exports = getToken;
