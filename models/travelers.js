const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travelerSchema = new Schema(
  {
    firstName: [[]],
    middleName: [[]],
    lastName: [[]],
    dateOfBirth: [[]],
    title: [[]],
    email: String,
    phoneNum: String,
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

const Traveler = mongoose.model("Traveler", travelerSchema);
module.exports = Traveler;
