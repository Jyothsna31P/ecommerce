const express = require('express');
const { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController.js');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware.js');
const router = express.Router();

// Get All Products
router.get('/', getAllProducts);

// Get Product by ID
router.get('/:id', getProductById);

// Create Product (Admin only)
router.post('/', authenticate, isAdmin, createProduct);

// Update Product (Admin only)
router.put('/:id', authenticate, isAdmin, updateProduct);

// Delete Product (Admin only)
router.delete('/:id', authenticate, isAdmin, deleteProduct);

module.exports = router;
