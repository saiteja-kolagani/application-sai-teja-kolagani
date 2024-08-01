import React, { useState } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [total, setTotal] = useState(0);
  const userId = 1; // This should be dynamically set based on logged-in user

  const handleCheckout = async () => {
    try {
      await axios.post('/api/orders/checkout', { user_id: userId, total });
      // Redirect or show success message
    } catch (error) {
      console.error(error);
      // Show error message
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} />
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Checkout;
