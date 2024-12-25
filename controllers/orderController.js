const Order = require('../models/orderModel.js');

// Place an Order
const placeOrder = async (req, res) => {
  const { items, totalAmount } = req.body;

  // Validate the items array
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ message: "Items must be a non-empty array." });
  }

  try {
    // Ensure all items have product, quantity, and price
    for (const item of items) {
      if (!item.product || !item.quantity || !item.price) {
        return res
          .status(400)
          .json({
            message: "Each item must have product, quantity, and price.",
          });
      }
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get Order History
const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel Order
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.status(200).json({ message: 'Order canceled' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { placeOrder, getOrderHistory, getOrderById, cancelOrder };
