import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch token from cookies
        const token = Cookies.get('authToken');

        // Check if the token exists
        if (!token) {
          console.error('No auth token found!');
          // Handle no token case, e.g., redirect or show an error
          return;
        }

        const result = await axios.get(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }, // Set Authorization header
          withCredentials: true, // Include credentials like cookies
        });

        setProduct(result.data);
      } catch (error) {
        console.error('Request failed with status code 403', error);
        // Handle error, e.g., show an error message
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductDetail;
