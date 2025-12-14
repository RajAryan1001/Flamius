// order.middleware.js
const Joi = require('joi');
const mongoose = require('mongoose');

const itemSchema = Joi.object({
  category: Joi.string().required(),
  name: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().min(0).required(),
  special: Joi.string().allow('').optional()
});

const createOrderSchema = Joi.object({
  customerName: Joi.string().min(1).required(),
  contact: Joi.string().allow('', null),
  items: Joi.array().items(itemSchema).min(1).required(),
  paymentMethod: Joi.string().valid('cash', 'card', 'online').optional(),
  notes: Joi.string().allow('', null)
});

const updateOrderSchema = Joi.object({
  customerName: Joi.string().min(1).optional(),
  contact: Joi.string().allow('', null).optional(),
  items: Joi.array().items(itemSchema).min(1).optional(),
  paymentMethod: Joi.string().valid('cash', 'card', 'online').optional(),
  status: Joi.string().valid('pending', 'accepted', 'preparing', 'ready', 'completed', 'cancelled').optional(),
  notes: Joi.string().allow('', null).optional()
});

function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      const details = error.details.map(d => d.message);
      return res.status(400).json({ ok: false, errors: details });
    }
    req.body = value;
    next();
  };
}

// Validate MongoDB ObjectId param
function validateObjectId(paramName = 'id') {
  return (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
      return res.status(400).json({ ok: false, message: 'Invalid id parameter' });
    }
    next();
  };
}

module.exports = {
  validateCreateOrder: validateBody(createOrderSchema),
  validateUpdateOrder: validateBody(updateOrderSchema),
  validateObjectId
};
