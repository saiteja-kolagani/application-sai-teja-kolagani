

Claw Enterprises: E-commerce Platform

Overview

Claw Enterprises is a full-stack e-commerce platform that enables users to browse products, add them to a shopping cart, and simulate a checkout process using a dummy payment gateway. This project uses a MERN stack, with React on the frontend, Node.js with Express on the backend, SQLite for database management, and JWT for authentication.


Table of Contents

1. Features
2. Architecture
3. Frontend Implementation
4. Backend Implementation
5. Database Schema
6. Authentication
7. Payment Gateway Integration
8. Deployment
9. Future Improvements
10. Conclusion


Features

- User Authentication: Users can sign up, log in, and have authenticated sessions.
- Product Management: Admin users can add, edit, and delete products.
- Cart Functionality: Users can add products to their cart, update quantities, and remove items.
- Order Processing: Simulated payment processing and order confirmation.
- Admin Dashboard: Manage products and view order details.

Architecture

The Claw Enterprises project follows a typical MERN stack architecture:

- Frontend: React.js for building a dynamic and responsive user interface.
- Backend: Node.js and Express.js for server-side logic and API routing.
- Database: SQLite for persistent data storage, providing a lightweight and easy-to-use solution.
- Authentication: JWT (JSON Web Tokens) for secure user authentication and authorization.

mermaid
graph LR
A[React Frontend] -- HTTP Requests --> B[Express API Server]
B -- Queries --> C[SQLite Database]
A -- JWT Authentication --> B
B -- Payment Requests --> D[Dummy Payment Gateway]


Frontend Implementation

The frontend of Claw Enterprises is implemented using React. Key components include:

Product List

- Features: Displays all products with options to add items to the cart.
- Code Example:

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '../Header/Header';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const userId = Cookies.get('userId');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = Cookies.get('authToken');
        const response = await fetch('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Header />
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;


Cart

- Features: Displays cart items, allowing users to update quantities or remove items.
- Checkout: Processes a mock payment request when users proceed to checkout.
- Code Example:

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Header from '../Header/Header';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = Cookies.get('userId');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = Cookies.get('authToken');
        const response = await fetch(`/api/cart/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleCheckout = async () => {
    const token = Cookies.get('authToken');
    const response = await fetch('/api/payments/process', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        userId,
        cartItems,
      }),
    });
    if (!response.ok) throw new Error('Failed to checkout');
    alert('Payment successful!');
    setCartItems([]);
  };

  return (
    <div>
      <Header />
      <h1>Shopping Cart</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.product_id}>
            {item.name} - Quantity: {item.quantity}
            <button>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;


Backend Implementation

The backend uses Express.js to handle API requests and manage business logic.

Product Routes

- Features: Handle CRUD operations for product management.
- Endpoints:
  - `GET /api/products`: Retrieve all products.
  - `POST /api/products`: Add a new product.
  - `PUT /api/products/:id`: Update a product.
  - `DELETE /api/products/:id`: Remove a product.

Cart Routes

- Features: Handle cart operations, including adding, updating, and removing items.
- Endpoints:
  - `GET /api/cart/:user_id`: Get cart items for a user.
  - `POST /api/cart`: Add an item to the cart.
  - `PUT /api/cart/:user_id/:product_id`: Update the quantity of an item.
  - `DELETE /api/cart/:user_id/:product_id`: Remove an item from the cart.

Order and Payment Routes

- Features: Simulate payment processing and order creation.
- Endpoints:
  - `POST /api/payments/process`: Process payment and create an order.

Example Backend Code for Products


// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', productController.getAllProducts);
router.post('/', authMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;


Database Schema

The project uses SQLite for database management, which is lightweight and easy to set up. Below is the schema for the database tables.

Users Table

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  role TEXT
);


Products Table

sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  description TEXT,
  price REAL,
  stock INTEGER
);


Carts Table


CREATE TABLE carts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(product_id) REFERENCES products(id)
);


Orders Table


CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  total REAL,
  status TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id)
);


Authentication

Authentication is managed using JWT, providing a secure way to verify user sessions.

- Login Process: Upon login, a JWT is issued to the user, stored in a cookie for authentication purposes.
- Middleware: `authMiddleware` checks for a valid JWT before granting access to protected routes.


// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
};


Payment Gateway Integration

A dummy payment gateway simulates payment processing to test the checkout functionality without real transactions.

Payment Processing Flow


1. Checkout: The user clicks checkout, sending a request to the payment API.
2. Payment Controller: Simulates a successful payment response.
3. Confirmation: The UI updates to confirm the transaction.

Payment Controller Code

// controllers/paymentController.js
exports.processPayment = (req, res) => {
  const { amount, userId, cartItems } = req.body;

  if (!amount || !userId || !cartItems) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  console.log(`Processing payment for user ${userId} with amount: $${amount}`);

  const paymentResult = {
    success: true,
    transactionId: `txn_${Math.random().toString(36).substr(2, 9)}`,
    message: 'Payment processed successfully',
  };

  setTimeout(() => {
    res.status(200).json(paymentResult);
  }, 2000);
};


Deployment

Deploying a MERN stack application involves hosting both the frontend and backend.

1. Backend: Deployed on a cloud platform (e.g., Heroku, AWS, or DigitalOcean) with a persistent SQLite database or an alternative like PostgreSQL for production.
2. Frontend: Hosted on platforms like Netlify or Vercel, serving the React app.

Future Improvements

- Real Payment Gateway: Integrate a real payment provider such as Stripe or PayPal.
- Enhanced Security: Implement rate limiting and more robust authentication measures.
- Scalability: Migrate to a more scalable database like MongoDB or PostgreSQL for larger datasets.
- User Experience: Improve UI/UX for better user engagement and accessibility.

Conclusion

Claw Enterprises demonstrates a comprehensive e-commerce platform with features essential for real-world applications. While leveraging modern technologies like React, Node.js, and JWT authentication, the project is a robust foundation for further expansion and real-world deployment.
