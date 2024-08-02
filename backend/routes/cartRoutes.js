const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

// Correct the POST route path to match the intended API endpoint
router.post('/', authMiddleware, (req, res) => {
  cartController.addItemToCart(req, res);
});

// Correct the GET route to fetch items based on the user_id
router.get('/:user_id', authMiddleware, (req, res) => {
  cartController.getCartItems(req, res);
});

module.exports = router;
