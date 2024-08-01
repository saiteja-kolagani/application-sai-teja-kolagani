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
  db.all(
    "SELECT * FROM carts WHERE user_id = ?",
    [user_id],
    (err, rows) => {
      callback(err, rows);
    }
  );
};

const clearCartByUserId = (user_id, callback) => {
  db.run("DELETE FROM carts WHERE user_id = ?", [user_id], function(err) {
    callback(err, this.changes);
  });
};

module.exports = { addItemToCart, getCartItemsByUserId, clearCartByUserId };
