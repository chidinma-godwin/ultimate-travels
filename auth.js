const { AuthenticationError } = require("apollo-server-express");
const qs = require("qs");
const axios = require("axios");
const User = require("./models/user");

// const checkSignedIn = (req) => {
//   if (!req.user.id) {
//     throw new AuthenticationError(
//       "You must be signed in to view this resource"
//     );
//   }
// };

// const isAdmin = (req) => {
//   const admin = User.findOne({ username: "administrator" });
//   if (req.user.id !== admin.id)
//     throw new AuthenticationError(
//       "This resource can only be viewed by the admin"
//     );
//     return user
// };

const attemptSignUp = async (email) => {
  const user = await User.findOne({ email });

  if (user) {
    return {
      ok: false,
      errors: [
        { path: "email", message: "A user with this email already exists" },
      ],
    };
  }
  return {
    ok: true,
    user: user,
  };
};

const validateReCaptcha = async (token) => {
  const secret_key = process.env.RECAPTCHA_SECRET_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

  const response = await axios({ method: "post", url });
  return response.data.success;
};

// Format graphql errors and show users
const formatErrors = (err) =>
  err.details.map((detail) => {
    return {
      path: detail.path[0],
      message: detail.message,
    };
  });

module.exports = { attemptSignUp, validateReCaptcha, formatErrors };
