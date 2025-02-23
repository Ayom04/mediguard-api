const Joi = require("joi");

const medicationRemainderSchema = Joi.object({
  medication_name: Joi.string().required(),
  medication_dose: Joi.string().required(),
  medication_time: Joi.string(),
  repeat_interval: Joi.number().integer().required(),
  last_sent: Joi.date(),
  medication_date: Joi.date(),
  schedule: Joi.date(),
});

module.exports = medicationRemainderSchema;
