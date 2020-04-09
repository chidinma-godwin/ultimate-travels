const User = require("../models/user");
const {
  validateSignUp,
  validateSignIn,
} = require("../joiSchemas/validateUser");
const { validateReCaptcha, attemptSignUp, formatErrors } = require("../auth");

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
      const joiArgs = {
        username: args.username,
        email: args.email,
        password: args.password,
        confirmPassword: args.confirmPassword,
      };
      if (await validateReCaptcha(args.token)) {
        try {
          await validateSignUp.validateAsync(joiArgs, {
            abortEarly: false,
          });
        } catch (err) {
          // Format graphql errors and show users
          const formattedError = formatErrors(err);
          console.log(formattedError);
          return {
            ok: false,
            errors: formattedError,
          };
        }
        try {
          attemptSignUp(args.email);
          const newUser = await User.create({
            username: args.username,
            email: args.email,
            password: args.password,
          });
          console.log(newUser);
          // await context.login(newUser);
          return {
            ok: true,
            user: user,
          };
        } catch (err) {
          let email_err = [];
          if (err.errors.email) {
            email_err = [
              {
                path: err.errors.email.properties.path,
                message: err.errors.email.message,
              },
            ];
          } else {
            email_err = [
              {
                path: "unknown",
                message: "An unexpected error occured. Pls try again",
              },
            ];
          }
          return {
            ok: false,
            errors: email_err,
          };
        }
      } else {
        return {
          ok: false,
          errors: [
            {
              path: "recaptcha",
              message:
                "Recaptcha verification failed! Please verify you're not a robot",
            },
          ],
        };
      }
    },
    signIn: async (root, args, context, info) => {
      const joiArgs = { email: args.email, password: args.password };

      if (await validateReCaptcha(args.token)) {
        try {
          await validateSignIn.validateAsync(joiArgs, {
            abortEarly: false,
          });
        } catch (err) {
          const formattedError = formatErrors(err);
          console.log(formattedError);
          return {
            ok: false,
            errors: formattedError,
          };
        }
        try {
          const { user } = await context.authenticate("graphql-local", args);
          await context.login(user);
          return {
            ok: true,
            user: user,
          };
        } catch (err) {
          return {
            ok: false,
            errors: [
              {
                path: "username/password",
                message: "Incorrect username or password",
              },
            ],
          };
        }
      } else {
        return {
          ok: false,
          errors: [
            {
              path: "recaptcha",
              message:
                "Recaptcha verification failed! Please check the recaptcha box",
            },
          ],
        };
      }
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
