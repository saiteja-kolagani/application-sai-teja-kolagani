import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', stock: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      const result = await axios.post('/api/products', newProduct);
      setProducts([...products, result.data]);
      setNewProduct({ name: '', description: '', price: '', stock: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
      <input type="text" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
      <input type="text" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
      <input type="text" placeholder="Stock" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
      <button onClick={handleAddProduct}>Add Product</button>
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

export default AdminDashboard;
