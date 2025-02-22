const Joi = require("joi");

const symptomCheckerSchema = Joi.object({
  message: Joi.string().required(),
});

module.exports = symptomCheckerSchema;
