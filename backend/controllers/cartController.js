const cartModel = require('../models/cartModel');

exports.addItemToCart = (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  if (!product_id) {
    return res.status(400).send('Invalid product ID');
  }

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

exports.removeCartItem = (req, res) => {
  const { product_id } = req.params;
  const { user_id } = req.params;

  if (!product_id) {
    return res.status(400).send('Invalid product ID');
  }

  cartModel.removeCartItem(user_id, product_id, (err) => {
    if (err) return res.status(500).send('Error removing item from cart.');
    res.status(200).send({ message: 'Item removed successfully' });
  });
};


exports.updateCartItem = (req, res) => {
  const { product_id } = req.params;
  const { user_id, quantity } = req.body;
  
  if (!product_id) {
    return res.status(400).send('Invalid product ID');
  }

  cartModel.updateCartItem(user_id, product_id, quantity, (err) => {
    if (err) return res.status(500).send('Error updating cart item.');
    res.status(200).send({ message: 'Item updated successfully' });
  });
};
