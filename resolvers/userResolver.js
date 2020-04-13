const User = require("../models/user");
const {
  validateSignUp,
  validateSignIn,
} = require("../joiSchemas/validateUser");
const {
  validateReCaptcha,
  attemptSignUp,
  attemptSignIn,
  formatErrors,
  requireAdminAuth,
  attemptSignout,
} = require("../auth");
const util = require("util");

const userResolver = {
  Query: {
    user: requireAdminAuth((root, args, context, info) => {
      return User.findById(id);
    }),

    users: (root, args, { req }, info) => {
      console.log(req.session);
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
            role: "Member",
          });
          return {
            ok: true,
            user: newUser,
          };
        } catch (err) {
          let email_err = [];
          console.log(err.errors);
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
                "Recaptcha verification failed! Please check the recaptcha box",
            },
          ],
        };
      }
    },

    signIn: async (root, { email, password }, { req, res }, info) => {
      if (await validateReCaptcha(args.token)) {
        try {
          await validateSignIn.validateAsync(
            { email, password },
            {
              abortEarly: false,
            }
          );
        } catch (err) {
          const formattedError = formatErrors(err);
          return {
            ok: false,
            errors: formattedError,
          };
        }
        try {
          const user = await attemptSignIn(email, password);
          new Promise(function (resolve, reject) {
            req.session.userID = user.id;
            req.session.save(function (err) {
              if (err) {
                console.log("Error saving session to store", err);
                return reject(err); // some error object
              }
              console.log("session saved");
              return resolve(req.session); // some success object
            });
          });
          console.log(req.sessionID);
          console.log(req.session);
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
    signOut: async (root, args, { req, res }, info) => attemptSignout(req, res),
  },
};

module.exports = userResolver;
