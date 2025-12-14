// order.routes.js
const express = require('express');
const orderController = require('../Controller/order.controller');
const { validateCreateOrder, validateUpdateOrder, validateObjectId } = require('../Middlewares/order.middleware');
const router = express.Router();

// Create order
router.post('/', validateCreateOrder, orderController.createOrder);

// List orders (GET /orders?page=1&limit=20&status=pending)
router.get('/', orderController.getOrders);

// Get single order
router.get('/:id', validateObjectId('id'), orderController.getOrderById);

// Update order (partial or full)
router.put('/:id', validateObjectId('id'), validateUpdateOrder, orderController.updateOrder);

// Delete order
router.delete('/:id', validateObjectId('id'), orderController.deleteOrder);

module.exports = router;
