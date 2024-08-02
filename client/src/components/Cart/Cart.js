import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Ensure to import js-cookie

import Header from '../Header/Header';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = Cookies.get('userId'); // Fetch userId from cookies

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const result = await axios.get(`/api/cart/${userId}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`, // Add token header
          },
        });
        setCartItems(result.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  return (
    <>
      <Header />
      <div>
        <h1>Shopping Cart</h1>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              Product ID: {item.product_id} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Cart;
