import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import Header from '../Header/Header';

import '../routes.css'
import './products.css'

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
    <div className='routes-bg'>
    <Header />
    <div className='admin-bg'>
      <h1>Admin Dashboard</h1>
      <div className='admin-input-containers-list'>
      <div className='admin-input-container'>
        <label htmlFor="product-name">Name</label>
        <br/>
      <input
        type="text"
        id="product-name"
        placeholder="Enter Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
    </div>
    <div className='admin-input-container'>
      <label htmlFor="product-name">Description</label>
      <br/>
      <input
        type="text"
        id="product-description"
        placeholder="Enter Description"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
      />
    </div>
    <div className='admin-input-container'>
      <label htmlFor="product-name">Price</label>
      <br/>
      <input
        type="number"
        id="product-price"
        placeholder="Enter Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
    </div>
    <div className='admin-input-container'>
      <label htmlFor="product-name">Stock</label>
      <br/>
      <input
        type="number"
        id="product-stock"
        placeholder="Enter Stock"
        value={newProduct.stock}
        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
      />
    </div>
    </div>
      <button onClick={handleAddProduct} className='admin-btn'>Add Product</button>
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
    </div>
  );
};

export default AdminDashboard;
