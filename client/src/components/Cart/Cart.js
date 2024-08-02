import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; 

import Header from '../Header/Header';

import '../routes.css'
import './cart.css'

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = Cookies.get('userId'); 

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const result = await axios.get(`/api/cart/${userId}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`, 
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
    <div className='routes-bg'>
      <Header />
      <div className='cart-bg'>
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
