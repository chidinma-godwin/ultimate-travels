const util = require("util");
const validateTraveler = require("../joiSchemas/validateTraveler");
const Traveler = require("../models/travelers");
const { requireAdminAuth } = require("../auth");

const travelerResolver = {
  Query: {
    Traveler: requireAdminAuth((root, { id }, context, info) =>
      Traveler.findById(id)
    ),
    allTravelers: requireAdminAuth((root, args, context, info) =>
      Traveler.find({})
    ),
  },

  Mutation: {
    addTraveler: async (root, args, context, info) => {
      await validateTraveler.validateAsync(args.input, { abortEarly: false });
      return Traveler.create(args.input);
    },
  },
};

module.exports = travelerResolver;
