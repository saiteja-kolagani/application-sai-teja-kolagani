const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');

exports.checkout = (req, res) => {
  const { user_id, total } = req.body;
  orderModel.createOrder(user_id, total, (err, orderId) => {
    if (err) return res.status(500).send('Error placing order.');
    cartModel.clearCartByUserId(user_id, (err) => {
      if (err) return res.status(500).send('Error clearing cart.');
      res.status(200).send({ order_id: orderId });
    });
  });
};

exports.getOrders = (req, res) => {
  const { user_id } = req.params;
  orderModel.getOrdersByUserId(user_id, (err, orders) => {
    if (err) return res.status(500).send('Error fetching orders.');
    res.status(200).send(orders);
  });
};