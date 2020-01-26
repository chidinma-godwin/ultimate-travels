const Joi = require("@hapi/joi");
const customJoi = Joi.extend(require("joi-phone-number"));

const validateTraveler = Joi.object({
  firstName: Joi.array().items(
    Joi.array()
      .items(
        Joi.string()
          .label("First Name")
          .required()
      )
      .single()
  ),
  middleName: Joi.array().items(
    Joi.array()
      .items(
        Joi.string()
          .label("Middle Name")
          .required()
      )
      .single()
  ),
  lastName: Joi.array().items(
    Joi.array()
      .items(
        Joi.string()
          .label("Last Name")
          .required()
      )
      .single()
  ),
  dateOfBirth: Joi.array().items(
    Joi.array()
      .items(
        Joi.string()
          .label("Date of Birth")
          .required()
      )
      .single()
  ),
  title: Joi.array().items(
    Joi.array()
      .items(
        Joi.string()
          .label("Title")
          .required()
      )
      .single()
  ),
  email: Joi.string()
    .email()
    .required()
    .label("Email"),
  phoneNum: customJoi
    .string()
    .phoneNumber()
    .required()
});

module.exports = validateTraveler;
