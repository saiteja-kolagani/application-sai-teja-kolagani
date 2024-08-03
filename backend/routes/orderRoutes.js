const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/checkout', authMiddleware, orderController.createOrder);
router.get('/:user_id', orderController.getOrders);

module.exports = router;
