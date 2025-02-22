const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  email_address: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email is not valid",
      "any.required": "Email is required",
    }),
  phone_number: Joi.string().messages({
    "string.empty": "Phone number is required",
    "any.required": "Phone number is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

const loginSchema = Joi.object({
  email_address: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email is not valid",
      "any.required": "Email is required",
    }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
