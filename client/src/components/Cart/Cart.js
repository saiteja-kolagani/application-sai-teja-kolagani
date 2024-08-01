import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = 1; // This should be dynamically set based on logged-in user

  useEffect(() => {
    const fetchCartItems = async () => {
      const result = await axios.get(`/api/cart/${userId}`);
      setCartItems(result.data);
    };
    fetchCartItems();
  }, [userId]);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            Product ID: {item.product_id} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
