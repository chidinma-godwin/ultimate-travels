const Joi = require("@hapi/joi");

const username = Joi.string().alphanum().max(30).required();
const password = Joi.string()
  .min(5)
  .max(30)
  .pattern(/^[a-zA-Z0-9]$/)
  .required();
const email = Joi.string().email({ minDomainSegments: 2 }).required();
const confirmPassword = Joi.ref("password");

const validateSignUp = Joi.object({
  username,
  email,
  password,
  confirmPassword,
}).with("password", "confirmPassword");

const validateSignIn = Joi.object({ email, password });

module.exports = { validateSignUp, validateSignIn };
