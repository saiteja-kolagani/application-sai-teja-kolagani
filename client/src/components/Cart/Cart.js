import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Header from '../Header/Header';

import '../routes.css';
import './cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = Cookies.get('userId'); // Get userId from cookies

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`/api/cart/${userId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`, // Include auth token in headers
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }

        const data = await response.json();
        console.log('Cart data:', data); // Debugging line to check fetched data
        setCartItems(data); // Update cart items with fetched data
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    if (userId) {
      fetchCartItems(); // Fetch cart items if userId is available
    }
  }, [userId]);

  // Function to handle item removal from the cart
  const handleRemoveFromCart = async (productId) => {
    try {
      const token = Cookies.get('authToken');
      
      console.log("Auth Token being sent:", token); // Log the token being sent
  
      if (!token) {
        console.error('No auth token found!');
        return;
      }
  
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
  
      setCartItems(cartItems.filter(item => item.product_id !== productId));
      console.log('Item removed successfully!');
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  

  return (
    <div className='routes-bg'>
      <Header />
      <div className='cart-bg'>
        <h1>Shopping Cart</h1>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <strong>Product Name:</strong> {item.name} <br />
              <strong>Product ID:</strong> {item.product_id} <br />
              <strong>Quantity:</strong> {item.quantity} <br />
              <strong>Price:</strong> ${item.price} <br />
              <button onClick={() => handleRemoveFromCart(item.product_id)}>Remove</button> {/* Remove Button */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
