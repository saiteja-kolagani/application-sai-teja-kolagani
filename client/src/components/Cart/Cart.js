import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import Header from '../Header/Header';

import '../routes.css';
import './cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = Cookies.get('userId');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!userId) {
          console.error('User ID not found in cookies!');
          return;
        }

        const token = Cookies.get('authToken');
        if (!token) {
          console.error('No auth token found!');
          return;
        }

        const result = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setCartItems(result.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userId]);

  return (
    <div className="routes-bg">
      <Header />
      <div className="cart-bg">
        <h1>Shopping Cart</h1>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              Product ID: {item.product_id} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
