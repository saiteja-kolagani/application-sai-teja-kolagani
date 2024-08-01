const db = require('./database');

const createOrder = (user_id, total, callback) => {
  db.run(
    "INSERT INTO orders (user_id, total, status) VALUES (?, ?, 'Pending')",
    [user_id, total],
    function(err) {
      callback(err, this.lastID);
    }
  );
};

const getOrdersByUserId = (user_id, callback) => {
  db.all(
    "SELECT * FROM orders WHERE user_id = ?",
    [user_id],
    (err, rows) => {
      callback(err, rows);
    }
  );
};

module.exports = { createOrder, getOrdersByUserId };
