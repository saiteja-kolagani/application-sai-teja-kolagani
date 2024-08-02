import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie to access cookies
import Header from '../Header/Header';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch token from cookies
        const token = Cookies.get('authToken');

        // If token doesn't exist, handle it (maybe redirect or show an error)
        if (!token) {
          console.error('No auth token found!');
          // Redirect or handle as needed
          return;
        }

        const result = await axios.get('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${token}` }, // Set Authorization header
          withCredentials: true, // Include credentials like cookies
        });

        setProducts(result.data);
      } catch (error) {
        console.error('Request failed with status code 403', error);
        // Handle errors, e.g., show an error message
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Header />
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
