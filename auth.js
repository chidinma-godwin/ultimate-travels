const { AuthenticationError } = require("apollo-server-express");
const axios = require("axios");
const User = require("./models/user");

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

const attemptSignIn = async (email, password) => {
  const user = await User.findOne({ email });
  let error;
  if (!user) {
    error = new Error("Incorrect username or password");
    return error;
  }

  if (!(await user.passwordMatch(password))) {
    error = new Error("Incorrect username or password");
    return error;
  }
  return user;
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

const requireAdminAuth = (resolver) => async (parent, args, context, info) => {
  const userId = context.req.session.userID;
  const user = await User.findById(userId);
  console.log(user);
  if (
    user &&
    user.role === "Administrator" &&
    user.email === "gchidex@yahoo.com"
  ) {
    return resolver(parent, args, context, info);
  } else {
    throw new AuthenticationError("Unauthorized");
  }
};

const requireAuth = (resolver) => async (parent, args, context, info) => {
  const userId = context.req.session.userID;
  const user = await User.findById(userId);
  console.log(user);

  if (user) {
    return resolver(parent, args, context, info);
  } else {
    throw new AuthenticationError("Not Authenticated");
  }
};

const attemptSignout = (req, res) =>
  new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err);
      res.clearCookie(process.env.SESS_NAME);
      resolve(true);
    });
  });

module.exports = {
  attemptSignUp,
  attemptSignIn,
  validateReCaptcha,
  formatErrors,
  requireAdminAuth,
  requireAuth,
  attemptSignout,
};
