import React from 'react';
import Header from '../Header/Header'

import '../routes.css'

const Payment = () => {
  return (
    <div className='routes-bg'>
        <Header />
        <div className="payment-page">
            <h1>Payment Page</h1>
            <h2>Order Placed</h2>
            <div>
                <img src="https://icpih.com/media-intestinal-health-ihsig/PAYMENT-SUCCESS.png" alt='payment' className='payment-image' />
            </div>
        </div>
    </div>
  );
};

export default Payment;
