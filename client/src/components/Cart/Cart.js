import React, { useState, useEffect } from 'react';
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
        const response = await fetch(`/api/cart/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }

        const data = await response.json();
        setCartItems(data);
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
