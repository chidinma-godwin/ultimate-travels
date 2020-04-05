const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visaSchema = new Schema(
  {
    firstName: String,
    middleName: String,
    lastName: String,
    title: String,
    gender: String,
    dateOfBirth: String,
    status: String,
    phoneNum: String,
    email: String,
    nationality: String,
    employmentStatus: String,
    address: String,
    departureDate: String,
    returnDate: String,
    travelHistory: String,
    destination: String,
    passportExpiryDate: String,
    passportNum: String,
    // selectedFile: String
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

const Visa = mongoose.model("Visa", visaSchema);
module.exports = Visa;
