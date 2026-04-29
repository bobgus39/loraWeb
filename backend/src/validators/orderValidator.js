const Joi = require("joi");

const orderSchema = Joi.object({
  orderId: Joi.string().required(),

  name: Joi.string().min(2).max(100).required(),

  email: Joi.string().email().required(),

  service: Joi.string().valid("fast", "full").required(),

  description: Joi.string().min(5).max(1000).required(),

  price: Joi.number().min(0).required(),

  extras: Joi.string().required(),
});

module.exports = orderSchema;