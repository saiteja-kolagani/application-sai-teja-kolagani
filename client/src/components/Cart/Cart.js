import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

import './cart.css'

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = Cookies.get('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = Cookies.get('authToken');

        if (!token) {
          console.error('No auth token found!');
          return;
        }

        const response = await fetch(`/api/cart/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
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

  const handleRemoveFromCart = async (productId) => {
    try {
      const token = Cookies.get('authToken');

      if (!token) {
        console.error('No auth token found!');
        return;
      }

      const response = await fetch(`/api/cart/${userId}/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }

      setCartItems((prevItems) => prevItems.filter(item => item.product_id !== productId));
      console.log('Item removed successfully!');
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      console.log('Quantity cannot be less than 1');
      return;
    }

    /*try {
      const token = Cookies.get('authToken');

      if (!token) {
        console.error('No auth token found!');
        return;
      }

      const response = await fetch(`/api/cart/${userId}/${productId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      setCartItems((prevItems) =>
        prevItems.map(item =>
          item.product_id === productId ? { ...item, quantity } : item
        )
      );
      console.log('Quantity updated successfully!');
    } catch (error) {
      console.error('Error updating quantity:', error);
    } */

      
  };

  const handleCheckout = async () => {
    try {
      const token = Cookies.get('authToken');
  
      if (!token) {
        console.error('No auth token found!');
        return;
      }
  
      /* const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          user_id: userId, // Ensure this is the correct user ID
          cartItems,       // Send cart items to the backend for processing
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to checkout');
      }
  
      // Optionally handle the response (e.g., order ID, success message)
      const data = await response.json();
      console.log('Order placed successfully!', data);
  
      // Clear cart items after successful checkout
      setCartItems([]); */
      navigate('/payment')
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to process checkout.');
    }
  };
  

  return (
    <div className='routes-bg'>
      <Header />
      <div className='cart-bg'>
        <h1>Shopping Cart</h1>
        <ul>
          {cartItems.map((item) => (
            <li key={item.product_id}>
              <p>Product Name: {item.name}</p> <p>Quantity: {item.quantity}</p> <p>Price: ${item.price}</p> 
              <button onClick={() => handleRemoveFromCart(item.product_id)} className='remove-btn'>Remove</button>
              <div>
                <button className='inc-dec-btn' onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)}>+</button>
                <span>{item.quantity}</span>
                <button className='inc-dec-btn' onClick={() => handleUpdateQuantity(item.product_id, item.quantity - 1)}>-</button>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={handleCheckout} className='checkout-btn'>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
