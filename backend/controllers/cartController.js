const cartModel = require('../models/cartModel');

exports.addItemToCart = (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  cartModel.addItemToCart(user_id, product_id, quantity, (err, cartId) => {
    if (err) return res.status(500).send('Error adding item to cart.');
    res.status(200).send({ id: cartId });
  });
};

exports.getCartItems = (req, res) => {
  const { user_id } = req.params;
  cartModel.getCartItemsByUserId(user_id, (err, cartItems) => {
    if (err) return res.status(500).send('Error fetching cart items.');
    res.status(200).send(cartItems);
  });
};
