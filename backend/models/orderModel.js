const db = require('./database');

exports.createOrder = (user_id, cartItems, callback) => {
  const orderQuery = `
    INSERT INTO orders (user_id, total, status)
    VALUES (?, ?, ?)
  `;

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  db.run(orderQuery, [user_id, totalPrice, 'Pending'], function (err) {
    if (err) return callback(err);

    const orderId = this.lastID;

    const orderItemsQuery = `
      INSERT INTO order_items (order_id, product_id, quantity)
      VALUES (?, ?, ?)
    `;
    
    cartItems.forEach(item => {
      db.run(orderItemsQuery, [orderId, item.product_id, item.quantity], (err) => {
        if (err) console.error('Error inserting order item:', err);
      });
    });

    callback(null, orderId);
  });
};
