const placesResolver = require("./placesResolver");
const sessionResolver = require("./sessionResolver");
const flightResolver = require("./flightResolver");
const checkOfferResolver = require("./checkOfferResolver");

module.exports = [
  placesResolver,
  sessionResolver,
  flightResolver,
  checkOfferResolver
];
