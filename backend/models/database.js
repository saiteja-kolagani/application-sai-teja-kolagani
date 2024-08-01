const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    stock INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total REAL,
    status TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    session_start TEXT,
    session_end TEXT,
    ip_address TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  // Insert sample products
  const sampleProducts = [
    { name: 'Product 1', description: 'Description for product 1', price: 19.99, stock: 100 },
    { name: 'Product 2', description: 'Description for product 2', price: 29.99, stock: 200 },
    { name: 'Product 3', description: 'Description for product 3', price: 39.99, stock: 300 },
    { name: 'Product 4', description: 'Description for product 4', price: 49.99, stock: 400 },
    { name: 'Product 5', description: 'Description for product 5', price: 59.99, stock: 500 }
  ];

  const insertProductStmt = db.prepare(`INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)`);
  sampleProducts.forEach(product => {
    insertProductStmt.run(product.name, product.description, product.price, product.stock);
  });
  insertProductStmt.finalize();
});

module.exports = db;
