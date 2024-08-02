// Import necessary modules and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Import middleware
const authMiddleware = require('./middleware/authMiddleware');

// Load environment variables
dotenv.config();

// Create an instance of Express
const app = express();

// Use CORS to allow requests from the client-side
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Use body-parser to parse JSON requests
app.use(bodyParser.json());

// Use express-session to handle session management
app.use(session({
  secret: process.env.SESSION_SECRET, // Ensure this is defined in your .env file
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Change to true if using HTTPS
    httpOnly: true
  }
}));

// Route configurations
app.use('/api/auth', authRoutes); // Auth routes don't require middleware
app.use('/api/products', authMiddleware, productRoutes); // Products require auth
app.use('/api/cart', authMiddleware, cartRoutes); // Cart operations require auth
app.use('/api/orders', authMiddleware, orderRoutes); // Order operations require auth

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
