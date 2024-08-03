const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, (req, res) => {
  cartController.addItemToCart(req, res);
});

router.get('/:user_id', authMiddleware, (req, res) => {
  cartController.getCartItems(req, res);
});

router.delete('/:user_id/:product_id', authMiddleware, (req, res) => {  // Use user_id and product_id in params
  cartController.removeCartItem(req, res);
});

router.put('/:user_id/:product_id', authMiddleware, (req, res) => {  // Use user_id and product_id in params
  cartController.updateCartItem(req, res);
});

module.exports = router;
