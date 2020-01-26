const mongoose = require("mongoose");
const util = require("util");
const Joi = require("@hapi/joi");
const validateTraveler = require("../schemas/validateTraveler");
const Traveler = require("../models/travelers");

const travelerResolver = {
  Query: {
    traveler: (root, args, context, info) => {
      return Traveler.findById(args.id);
    },

    allTravelers: (root, args, context, info) => {
      return Traveler.find({});
    }
  },

  Mutation: {
    addTraveler: async (root, args, context, info) => {
      console.log(args, util.inspect(args, { depth: 10 }));
      await validateTraveler.validateAsync(args.input, { abortEarly: false });
      return Traveler.create(args.input);
    }
  }
};

module.exports = travelerResolver;
