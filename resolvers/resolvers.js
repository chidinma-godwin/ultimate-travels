const placesResolver = require("./placesResolver");
const flightResolver = require("./flightResolver");
const checkOfferResolver = require("./checkOfferResolver");
const flightInspirationResolver = require("./flightInspirationResolver");
const travelerResolver = require("./travelerResolver");
const visaProcessingResolver = require("./visaProcessingResolver");
const hotelsResolver = require("./hotelsResolver");
const hotelBookingResolver = require("./hotelBookingResolver");
const tourResolver = require("./tourResolver");
const tourDetailsResolver = require("./tourDetailsResolver");
const userResolver = require("./userResolver");

module.exports = [
  placesResolver,
  flightResolver,
  checkOfferResolver,
  flightInspirationResolver,
  travelerResolver,
  visaProcessingResolver,
  hotelsResolver,
  hotelBookingResolver,
  tourResolver,
  tourDetailsResolver,
  userResolver,
];
