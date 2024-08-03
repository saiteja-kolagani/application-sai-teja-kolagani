const db = require('./database');

const addItemToCart = (user_id, product_id, quantity, callback) => {
  db.run(
    "INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)",
    [user_id, product_id, quantity],
    function(err) {
      callback(err, this.lastID);
    }
  );
};

const getCartItemsByUserId = (user_id, callback) => {
  // Join products and carts table to fetch product details along with cart items
  const query = `
    SELECT carts.id, carts.product_id, carts.quantity, products.name, products.price
    FROM carts
    JOIN products ON carts.product_id = products.id
    WHERE carts.user_id = ?
  `;
  
  db.all(query, [user_id], (err, rows) => {
    callback(err, rows);
  });
};


const clearCartByUserId = (user_id, callback) => {
  db.run("DELETE FROM carts WHERE user_id = ?", [user_id], function(err) {
    callback(err, this.changes);
  });
};

module.exports = { addItemToCart, getCartItemsByUserId, clearCartByUserId };
