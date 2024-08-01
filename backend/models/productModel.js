const db = require('./database');

const createProduct = (name, description, price, stock, callback) => {
  db.run(
    "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)",
    [name, description, price, stock],
    function(err) {
      callback(err, this.lastID);
    }
  );
};

const getAllProducts = (callback) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    callback(err, rows);
  });
};

const updateProduct = (id, name, description, price, stock, callback) => {
  db.run(
    "UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?",
    [name, description, price, stock, id],
    function(err) {
      callback(err, this.changes);
    }
  );
};

const deleteProduct = (id, callback) => {
  db.run("DELETE FROM products WHERE id = ?", [id], function(err) {
    callback(err, this.changes);
  });
};

module.exports = { createProduct, getAllProducts, updateProduct, deleteProduct };
