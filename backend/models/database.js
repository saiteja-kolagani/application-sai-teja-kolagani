const sqlite3 = require('sqlite3').verbose();
const dotenv = require('dotenv');

dotenv.config();

const db = new sqlite3.Database(process.env.DB_PATH || './database.sqlite', (err) => {
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    price REAL,
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
)`);

  db.run(`CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    session_start TEXT,
    session_end TEXT,
    ip_address TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  const sampleProducts = [
    { name: 'Tata Steel', description: 'Tata Steel Limited is an India-based global steel company with an annual crude steel capacity of approximately 35 million tons per annum. The Company is primarily engaged in the business of manufacturing and distribution of steel products across the globe. The Company and its subsidiaries have a presence across the value chain of steel manufacturing from mining and processing iron ore and coal to producing and distributing finished products. Its products include cold rolled (Non-branded), BP sheets, Galvano, HR commercial, hot rolled pickled and oiled and hot rolled skin passed pickled and oiled, high tensile steel strapping, pre-engineered buildings, projects/tenders, construction and projects, and full hard cold rolled. The Companys brands include MagiZinc, Ymagine, Ympress, Contiflo, Strongbox, SAB Profil, Fischer Profil, Montana, Advantica, Fischertherm, Fischerfireproof, Montanatherm, Montapanel, Swiss Panel, Holorib, Serica, MagiZinc Auto, HyperForm, HILUMIN, and Colorcoat.', price: 15822.64, stock: 100 },
    { name: 'Zomato', description: 'Zomato Limited operates as an Internet portal that helps in connecting the users, restaurant partners and delivery partners. The Company also provides a platform for restaurant partners to advertise themselves to the target audience in India and abroad and supply ingredients to restaurant partners. Its segments include India food ordering and delivery; Hyperpure supplies (B2B business); Quick commerce business, and All other segments (residual). India food ordering and delivery is the online platform through which the Company facilitates food ordering and delivery of the food items by connecting the end users, restaurant partners, and delivery personnel. Its Hyperpure supplies (B2B business) segment offers farm-to-fork supplies for restaurants in India. Quick commerce business is a quick commerce online platform facilitating quick delivery of goods and other essentials by connecting the end users, providing delivery services, and warehousing services.', price: 14953.38, stock: 57 },
    { name: 'GTL Infrastructure', description: 'GTL Infrastructure Limited is engaged in the business of passive infrastructure sharing, which is based on building, owning, operating, and maintaining passive telecom infrastructure sites capable of hosting active network components of various technologies of multiple telecom operators, as well as providing energy management solutions. It offers telecom towers, which are shared by telecom operators in India. It enables the telecom networks with second-generation (2G), third-generation (3G), and fourth-generation (4G), through its approximately 26,000 telecom towers located across 22 telecom circles. The Companys services offering includes Infrastructure Sharing and Energy Management. The Company enables telecom operators to host their active equipment at its sites by providing space in shelters. The Company delivers power on towers at predetermined costs to its customers. It utilizes energy sources and storage solutions through technology and skills.', price: 1045.44, stock: 363 },
    { name: 'Paytm', description: 'One 97 Communications Limited owns and operates the brand Paytm. Paytm is a payment app offering consumers and merchants comprehensive payment services. Its segments include Payment, Commerce, Cloud, and others. The Company is in the business of providing payment and financial services, which primarily includes payment facilitator services, facilitation of consumer and merchant lending to consumers and merchants, wealth management. It is also involved in providing commerce and cloud services, which primarily consists of aggregator for digital products, ticketing business, providing voice, and messaging platforms to the telecom operators and enterprise customers and other businesses. The Company provides various services, such as net banking and Paytm payment instruments like wallet, Paytm postpaid (BNPL) to make online payments for mobile recharge, utility bills, rent, education, wallet top-ups and money transfers using the Paytm app.', price: 24769.00, stock: 47 },
    { name: 'Jammu & Kashmir Bank', description: 'Jammu and Kashmir Bank Limited (the Bank) is engaged in banking and financial services. Its segments include Retail, Corporate and Treasury. The Bank offers a range of products and services, such as loans, personal accounts, term deposits, insurance, cards, business accounts, agriculture loans and others. The Bank offers a range of retail credit products, including home finance, personal loans, education loans, agriculture lending, trade credit and consumer credit and a number of financial products tailored to the needs of various customer segments. It provides loans, such as housing loan, consumer loan, JK bank personal, consumption loan scheme, laptop/pc finance, festival advance scheme, education loan scheme and others. It operates through over 955 branches, which include approximately 174 metro branches, over 110 urban branches, 162 semi-urban branches and 544 rural branches, which are spread over 18 states and four union territories.', price: 8538.08, stock: 73 }
  ];

  const insertProductStmt = db.prepare(`INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)`);
  sampleProducts.forEach(product => {
    insertProductStmt.run(product.name, product.description, product.price, product.stock);
  });
  insertProductStmt.finalize();
});

module.exports = db;