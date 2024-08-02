import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Checkout = () => {
  const [total, setTotal] = useState(0);

  const handleCheckout = async () => {
    const token = Cookies.get('authToken');
    if (!token) {
      console.error('No auth token found!');
      return;
    }

    try {
      await axios.post(
        '/api/orders/checkout',
        { total },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      // Handle success (redirect, show message, etc.)
    } catch (error) {
      console.error('Error during checkout:', error);
      // Show error message
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <input
        type="number"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
      />
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Checkout;
