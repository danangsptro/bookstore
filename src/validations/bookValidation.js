const Joi = require('joi');
module.exports = {
  createBook: Joi.object({
    title: Joi.string().required(),
    author: Joi.string().optional().allow(''),
    price: Joi.number().integer().min(0).required(),
    stock: Joi.number().integer().min(0).required(),
    description: Joi.string().optional().allow('')
  }),
  updateStock: Joi.object({
    stock: Joi.number().integer().min(0).required()
  })
};
