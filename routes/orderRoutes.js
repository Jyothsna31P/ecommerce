const express = require('express');
const { 
  placeOrder, getOrderHistory, getOrderById, cancelOrder
} = require('../controllers/orderController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

// Place an Order
router.post('/', authenticate, placeOrder);

// Get Order by ID
router.get('/:id', authenticate, getOrderById);

// Get User's Orders
router.get('/', authenticate, getOrderHistory);

// Cancel an Order
router.delete('/:id', authenticate, cancelOrder);

module.exports = router;
