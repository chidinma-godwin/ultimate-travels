const qs = require("qs");
const User = require("../models/user");
const {
  validateSignUp,
  validateSignIn,
} = require("../joiSchemas/validateUser");
const { checkSignedIn, attemptSignUp } = require("../auth");

const userResolver = {
  Query: {
    user: (root, args, context, info) => {
      return User.findById(id);
    },

    users: (root, args, context, info) => {
      return User.find();
    },
  },

  Mutation: {
    signUp: async (root, args, context, info) => {
      await validateSignUp.validate(args, { abortEarly: false });
      attemptSignUp(args.email);
      const newUser = await User.create({
        username: args.username,
        email: args.email,
        password: args.password,
      });
      console.log(newUser);
      await context.login(newUser);
      return newUser;
    },
    signIn: async (root, args, context, info) => {
      await validateSignIn.validate(args, { abortEarly: false });
      const { user } = await context.authenticate("graphql-local", args);
      await context.login(user);
      return user;
    },
    signOut: async (root, args, context, info) => {
      try {
        await context.logout();
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};

module.exports = userResolver;
