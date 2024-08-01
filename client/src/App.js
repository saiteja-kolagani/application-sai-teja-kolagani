import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProductList from './components/Products/ProductList';
import ProductDetail from './components/Products/ProductDetail';
import AdminDashboard from './components/Products/AdminDashboard';
import Cart from './components/Cart/Cart';
import Checkout from './components/Cart/Checkout';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/" element={<ProductList />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
