import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

import '../routes.css';
import './products.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const userId = Cookies.get('userId');

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

  const handleAddToCart = async (productId) => {
    try {
      const token = Cookies.get('authToken');

      if (!token) {
        console.error('No auth token found!');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/cart', // Correct API endpoint
        {
          user_id: userId,
          product_id: productId,
          quantity: 1, // Assuming you want to add 1 item initially
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert('Product added to cart!');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  return (
    <div className="routes-bg">
      <Header />
      <div className="products-bg">
        <h1>Products</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>
                {product.name} - {product.description} - ${product.price} - Stocks {product.stock}
              </Link>
              <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
