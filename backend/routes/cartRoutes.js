const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

router.post('/', cartController.addItemToCart);
router.get('/:user_id', cartController.getCartItems);

module.exports = router;
