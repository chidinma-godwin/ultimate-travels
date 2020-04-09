const Joi = require("@hapi/joi");

const username = Joi.string().alphanum().max(30).required().messages({
  "string.empty": `No username entered`,
  "any.required": `"A username is required`,
});
const password = Joi.string().min(5).max(30).required().messages({
  "string.empty": `No password entered`,
  "any.required": `"A password is required`,
});
const email = Joi.string().email({ minDomainSegments: 2 }).required().messages({
  "string.empty": `No email entered`,
  "any.required": `"An email is required`,
});
const confirmPassword = Joi.string()
  .required()
  .valid(Joi.ref("password"))
  .messages({
    "any.required": `"Confirm your password`,
    "string.empty": "Confirm password",
    "any.only": "Passwords must match",
  });

const validateSignUp = Joi.object({
  username,
  email,
  password,
  confirmPassword,
}).with("password", "confirmPassword");

const validateSignIn = Joi.object({ email, password });

module.exports = { validateSignUp, validateSignIn };
