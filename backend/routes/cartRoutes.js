const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to add an item to the cart
router.post('/cart', authMiddleware, (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  console.log("Received User ID: ", user_id); // Log the user ID
  cartController.addItemToCart(req, res);
});

// Route to get items from the cart for a specific user
router.get('/cart/:user_id', authMiddleware, (req, res) => {
  const { user_id } = req.params;
  console.log("Received User ID: ", user_id); // Log the user ID
  cartController.getCartItems(req, res);
});

module.exports = router;
