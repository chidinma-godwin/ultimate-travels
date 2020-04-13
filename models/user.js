const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "A username is required"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      validate: {
        validator: async (email) =>
          (await User.where({ email }).countDocuments()) === 0,
        message: () => "A user with this email already exist",
      },
    },
    password: {
      type: String,
      required: [true, "Password required"],
    },
    role: {
      type: String,
      default: "Member",
    },
  },
  {
    timestamps: { currentTime: () => Math.floor(new Date() / 1000) },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

userSchema.methods.passwordMatch = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
