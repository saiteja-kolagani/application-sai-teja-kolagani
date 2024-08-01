import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch token from local storage
        const token = localStorage.getItem('token');
        const result = await axios.get(
          'http://localhost:5000/api/products',
          {
            headers: { 'Authorization': `Bearer ${token}` },
            withCredentials: true // Include credentials like cookies
          }
        );
        setProducts(result.data);
      } catch (error) {
        console.error('Request failed with status code 403', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
