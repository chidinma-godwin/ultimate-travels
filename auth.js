const { AuthenticationError } = require("apollo-server-express");
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

  if (user)
    throw new AuthenticationError("user with this email already exists");
  return user;
};

module.exports = { attemptSignUp };
