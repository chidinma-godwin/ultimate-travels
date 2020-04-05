const util = require("util");
const validateTraveler = require("../joiSchemas/validateTraveler");
const Traveler = require("../models/travelers");

const travelerResolver = {
  Query: {
    Traveler: (root, { id }, context, info) => Traveler.findById(id),
    allTravelers: (root, args, context, info) => Traveler.find({}),
  },

  Mutation: {
    addTraveler: async (root, args, context, info) => {
      console.log(args, util.inspect(args, { depth: 10 }));
      await validateTraveler.validateAsync(args.input, { abortEarly: false });
      return Traveler.create(args.input);
    },
  },
};

module.exports = travelerResolver;
