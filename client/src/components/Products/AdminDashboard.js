  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import Cookies from 'js-cookie';
  import Header from '../Header/Header';

  import '../routes.css';
  import './products.css';

  const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
      name: '',
      description: '',
      price: '',
      stock: ''
    });
    const [editMode, setEditMode] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);

    const apiURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const token = Cookies.get('authToken');
          if (!token) {
            console.error('No auth token found!');
            return;
          }

          const result = await axios.get(`${apiURL}/api/products`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          setProducts(result.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      fetchProducts();
    }, [apiURL]); // Include apiURL in the dependency array

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

        const result = await axios.post(`${apiURL}/api/products`, newProduct, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setProducts([...products, result.data]);
        setNewProduct({ name: '', description: '', price: '', stock: '' });
      } catch (error) {
        console.error('Error adding product:', error);
      }
    };

    const handleEditProduct = (product) => {
      setEditMode(true);
      setEditingProductId(product.id);
      setNewProduct({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      });
    };

    const handleUpdateProduct = async () => {
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

        await axios.put(`${apiURL}/api/products/${editingProductId}`, newProduct, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setProducts(products.map((product) =>
          product.id === editingProductId ? { ...product, ...newProduct } : product
        ));

        setEditMode(false);
        setEditingProductId(null);
        setNewProduct({ name: '', description: '', price: '', stock: '' });
      } catch (error) {
        console.error('Error updating product:', error);
      }
    };

    const handleDeleteProduct = async (productId) => {
      try {
        const token = Cookies.get('authToken');
        if (!token) {
          console.error('No auth token found!');
          return;
        }

        await axios.delete(`${apiURL}/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setProducts(products.filter((product) => product.id !== productId));
        console.log('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };

    return (
      <div className="routes-bg">
        <Header />
        <div className="admin-bg">
          <h1>Admin Dashboard</h1>
          <div className="admin-input-containers-list">
            <div className="admin-input-container">
              <label htmlFor="product-name">Name</label>
              <br />
              <input
                type="text"
                id="product-name"
                placeholder="Enter Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </div>
            <div className="admin-input-container">
              <label htmlFor="product-description">Description</label>
              <br />
              <input
                type="text"
                id="product-description"
                placeholder="Enter Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
            </div>
            <div className="admin-input-container">
              <label htmlFor="product-price">Price</label>
              <br />
              <input
                type="number"
                id="product-price"
                placeholder="Enter Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </div>
            <div className="admin-input-container">
              <label htmlFor="product-stock">Stock</label>
              <br />
              <input
                type="number"
                id="product-stock"
                placeholder="Enter Stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
              />
            </div>
          </div>
          <button
            onClick={editMode ? handleUpdateProduct : handleAddProduct}
            className="admin-btn"
          >
            {editMode ? 'Update Product' : 'Add Product'}
          </button>
          <ul>
            {products.map((product, index) => (
              <li key={product.id}>
                <h3>
                  {index + 1}. {product.name}
                </h3>
                <p>Description: {product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Stock: {product.stock} units</p>
                <button
                  onClick={() => handleEditProduct(product)}
                  className="admin-edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="admin-delete-btn"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  export default AdminDashboard;
