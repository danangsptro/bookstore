const Joi = require('joi');
module.exports = {
  addToCart: Joi.object({
    bookId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).default(1)
  })
};
