const productModel = require('../models/productModel');

// Create a new product
exports.createProduct = (req, res) => {
  const { name, description, price, stock } = req.body;
  productModel.createProduct(name, description, price, stock, (err, productId) => {
    if (err) {
      return res.status(500).send('Error creating product.');
    }
    res.status(201).send({ id: productId, message: 'Product created successfully.' });
  });
};

// Get all products
exports.getAllProducts = (req, res) => {
  productModel.getAllProducts((err, products) => {
    if (err) {
      return res.status(500).send('Error fetching products.');
    }
    res.status(200).send(products);
  });
};

// Get a single product by ID
exports.getProductById = (req, res) => {
  const productId = req.params.id;
  productModel.getProductById(productId, (err, product) => {
    if (err) {
      return res.status(500).send('Error fetching product.');
    }
    if (!product) {
      return res.status(404).send('Product not found.');
    }
    res.status(200).send(product);
  });
};

// Update a product
exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  const { name, description, price, stock } = req.body;
  productModel.updateProduct(productId, name, description, price, stock, (err) => {
    if (err) {
      return res.status(500).send('Error updating product.');
    }
    res.status(200).send({ message: 'Product updated successfully.' });
  });
};

// Delete a product
exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  productModel.deleteProduct(productId, (err) => {
    if (err) {
      return res.status(500).send('Error deleting product.');
    }
    res.status(200).send({ message: 'Product deleted successfully.' });
  });
};
