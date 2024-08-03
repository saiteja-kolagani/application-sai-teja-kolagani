
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const adminMiddleware = require('../middleware/adminMiddleware');


router.post('/', adminMiddleware, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', adminMiddleware, productController.updateProduct);
router.delete('/:id', adminMiddleware, productController.deleteProduct);

module.exports = router;
