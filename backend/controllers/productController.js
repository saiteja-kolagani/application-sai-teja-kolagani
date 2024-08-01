const productModel = require('../models/productModel');

exports.createProduct = (req, res) => {
  const { name, description, price, stock } = req.body;
  productModel.createProduct(name, description, price, stock, (err, productId) => {
    if (err) return res.status(500).send('Error creating product.');
    res.status(200).send({ id: productId });
  });
};

exports.getProducts = (req, res) => {
  productModel.getAllProducts((err, products) => {
    if (err) return res.status(500).send('Error fetching products.');
    res.status(200).send(products);
  });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  productModel.updateProduct(id, name, description, price, stock, (err, changes) => {
    if (err) return res.status(500).send('Error updating product.');
    res.status(200).send({ changes });
  });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  productModel.deleteProduct(id, (err, changes) => {
    if (err) return res.status(500).send('Error deleting product.');
    res.status(200).send({ changes });
  });
};
