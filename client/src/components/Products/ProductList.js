import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '../Header/Header';

import '../routes.css'
import './products.css'

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = Cookies.get('authToken');

        if (!token) {
          console.error('No auth token found!');
          return;
        }

        const result = await axios.get('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${token}` }, 
          withCredentials: true, 
        });

        setProducts(result.data);
      } catch (error) {
        console.error('Request failed with status code 403', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='routes-bg'>
      <Header />
      <div className='products-bg'>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.description} - ${product.price} - Stocks {product.stock}
          </li>
        ))}
      </ul>
      </div>
      
    </div>
  );
};

export default ProductList;
