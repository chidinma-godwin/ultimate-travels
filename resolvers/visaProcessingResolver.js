const util = require("util");
const validateVisaRequest = require("../joiSchemas/validateVisaRequest");
const Visa = require("../models/visas");
const { requireAdminAuth } = require("../auth");

const visaProcessingResolver = {
  Query: {
    visaProcessing: requireAdminAuth((root, args, context, info) => {
      return Visa.findById(args.id);
    }),

    allVisaRequest: requireAdminAuth((root, args, context, info) => {
      return Visa.find({});
    }),
  },

  Mutation: {
    addVisaRequest: async (root, args, context, info) => {
      await validateVisaRequest.validateAsync(args.input, {
        abortEarly: false,
      });
      return Visa.create(args.input);
    },
  },
};

module.exports = visaProcessingResolver;
