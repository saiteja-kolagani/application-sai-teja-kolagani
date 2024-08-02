import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import Header from '../Header/Header';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', stock: '' });

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
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    // Validate product data
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.stock) {
      alert('All fields must be filled out.');
      return;
    }

    try {
      const token = Cookies.get('authToken');
      if (!token) {
        console.error('No auth token found!');
        return;
      }

      const result = await axios.post('http://localhost:5000/api/products', newProduct, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setProducts([...products, result.data]);
      setNewProduct({ name: '', description: '', price: '', stock: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <>
    <Header />
    <div>
      <h1>Admin Dashboard</h1>
      <input
        type="text"
        placeholder="Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <input
        type="number"
        placeholder="Stock"
        value={newProduct.stock}
        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
      />
      <button onClick={handleAddProduct}>Add Product</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock} units</p>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default AdminDashboard;
