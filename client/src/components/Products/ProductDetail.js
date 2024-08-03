
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';

import '../routes.css';
import './products.css';

const apiURL = process.env.REACT_APP_API_URL;

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = Cookies.get('authToken');
        if (!token) {
          console.error('No auth token found!');
          return;
        }

        const result = await axios.get(`${apiURL}/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setProduct(result.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="routes-bg">
      <Header />
      <div className="product-detail-bg">
        <h1>Product Details</h1>
        <h2>{product.name}</h2>
        <p>Description: {product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Stock: {product.stock} units</p>
      </div>
    </div>
  );
};

export default ProductDetail;