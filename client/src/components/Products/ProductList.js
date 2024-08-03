import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

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

        const response = await fetch('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
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

      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
          quantity: 1,
        }),
      });

      if (response.ok) {
        alert('Product added to cart!');
      } else {
        const errorData = await response.json();
        console.error('Failed to add product to cart:', errorData.message);
        alert('Failed to add product to cart.');
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
              <Link to={`/products/${product.id}`} className='product-link'>
              <p className='stock-name'>{product.name}</p> <p>Know more about the stock...</p> <p>Rs.{product.price}</p> <p> Stocks {product.stock}</p>
              </Link>
              <button className='add-cart-btn' onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
