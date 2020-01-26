const util = require("util");
const validateVisaRequest = require("../schemas/validateVisaRequest");
const Visa = require("../models/visas");

const visaProcessingResolver = {
  Query: {
    visaProcessing: (root, args, context, info) => {
      return Visa.findById(args.id);
    },

    allVisaRequest: (root, args, context, info) => {
      return Visa.find({});
    }
  },

  Mutation: {
    addVisaRequest: async (root, args, context, info) => {
      console.log(args, util.inspect(args, { depth: 10 }));
      await validateVisaRequest.validateAsync(args.input, {
        abortEarly: false
      });
      return Visa.create(args.input);
    }
  }
};

module.exports = visaProcessingResolver;
