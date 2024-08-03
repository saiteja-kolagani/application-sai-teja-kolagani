const db = require('./database');


const createProduct = (name, description, price, stock, callback) => {
  const query = `INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)`;
  const params = [name, description, price, stock];
  
  db.run(query, params, function (err) {
    if (err) {
      console.error('Error inserting product into database:', err.message);
      callback(err, null);
      return;
    }
    callback(null, this.lastID);
  });
};


const getAllProducts = (callback) => {
  const query = `SELECT * FROM products`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching products from database:', err.message);
      callback(err, null);
      return;
    }
    callback(null, rows);
  });
};


const getProductById = (id, callback) => {
  const query = `SELECT * FROM products WHERE id = ?`;
  const params = [id];
  
  db.get(query, params, (err, row) => {
    if (err) {
      console.error('Error fetching product from database:', err.message);
      callback(err, null);
      return;
    }
    callback(null, row);
  });
};


const updateProduct = (id, name, description, price, stock, callback) => {
  const query = `UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?`;
  const params = [name, description, price, stock, id];
  
  db.run(query, params, function (err) {
    if (err) {
      console.error('Error updating product in database:', err.message);
      callback(err);
      return;
    }
    callback(null);
  });
};


const deleteProduct = (id, callback) => {
  const query = `DELETE FROM products WHERE id = ?`;
  const params = [id];
  
  db.run(query, params, function (err) {
    if (err) {
      console.error('Error deleting product from database:', err.message);
      callback(err);
      return;
    }
    callback(null);
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};