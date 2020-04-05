const Joi = require("@hapi/joi");
const customJoi = Joi.extend(require("joi-phone-number"));

const validateVisaRequest = Joi.object({
  firstName: Joi.string()
    .required()
    .label("First Name"),
  middleName: Joi.string()
    .required()
    .label("Middle Name"),
  lastName: Joi.string()
    .required()
    .label("Last Name"),
  title: Joi.string()
    .required()
    .label("Title"),
  gender: Joi.string()
    .required()
    .label("Gender"),
  dateOfBirth: Joi.string()
    .required()
    .label("Date of Birth"),
  status: Joi.string()
    .required()
    .label("Status"),
  nationality: Joi.string()
    .required()
    .label("Nationality"),
  employmentStatus: Joi.string()
    .required()
    .label("Employment Status"),
  address: Joi.string()
    .required()
    .label("Address"),
  departureDate: Joi.string()
    .required()
    .label("Departure Date"),
  returnDate: Joi.string()
    .required()
    .label("Return Date"),
  travelHistory: Joi.string()
    .required()
    .label("Travel History"),
  destination: Joi.string()
    .required()
    .label("Destination"),
  passportExpiryDate: Joi.string()
    .required()
    .label("Passport Expiry Date"),
  passportNum: Joi.string()
    .required()
    .label("Passport Number"),
  email: Joi.string()
    .email()
    .required()
    .label("Email"),
  phoneNum: customJoi
    .string()
    .phoneNumber()
    .label("Phone Number")
    .required()
});

module.exports = validateVisaRequest;
