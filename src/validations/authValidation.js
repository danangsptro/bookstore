const Joi = require('joi');
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().optional(),
  role: Joi.string().valid('customer','admin').optional()
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
module.exports = { registerSchema, loginSchema };
