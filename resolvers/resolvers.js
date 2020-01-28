const placesResolver = require("./placesResolver");
const sessionResolver = require("./sessionResolver");
const flightResolver = require("./flightResolver");
const checkOfferResolver = require("./checkOfferResolver");
const flightInspirationResolver = require("./flightInspirationResolver");
const travelerResolver = require("./travelerResolver");
const visaProcessingResolver = require("./visaProcessingResolver");
const hotelsResolver = require("./hotelsResolver");

module.exports = [
  placesResolver,
  sessionResolver,
  flightResolver,
  checkOfferResolver,
  flightInspirationResolver,
  travelerResolver,
  visaProcessingResolver,
  hotelsResolver
];
