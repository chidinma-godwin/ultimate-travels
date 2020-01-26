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
    phoneNum: String
  },
  {
    timestamps: true
  }
);

const Traveler = mongoose.model("Traveler", travelerSchema);
module.exports = Traveler;
