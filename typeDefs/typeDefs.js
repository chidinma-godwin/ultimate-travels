const root = require("./root");
const places = require("./places");
const session = require("./session");
const flightDetails = require("./flights");
const checkOffer = require("./checkOffer");
const flightInspiration = require("./flightInspiration");
const traveler = require("./traveler");
const visaProcessing = require("./visaProcessing");

module.exports = [
  root,
  places,
  session,
  flightDetails,
  checkOffer,
  flightInspiration,
  traveler,
  visaProcessing
];
