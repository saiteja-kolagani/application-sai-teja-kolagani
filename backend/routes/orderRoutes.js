const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.post('/checkout', orderController.checkout);
router.get('/:user_id', orderController.getOrders);

module.exports = router;
