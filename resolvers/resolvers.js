const placesResolver = require("./placesResolver");
const sessionResolver = require("./sessionResolver");
const flightResolver = require("./flightResolver");
const checkOfferResolver = require("./checkOfferResolver");
const flightInspirationResolver = require("./flightInspirationResolver");

module.exports = [
  placesResolver,
  sessionResolver,
  flightResolver,
  checkOfferResolver,
  flightInspirationResolver
];
