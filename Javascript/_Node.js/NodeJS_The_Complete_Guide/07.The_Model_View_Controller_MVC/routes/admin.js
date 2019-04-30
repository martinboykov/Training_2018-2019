const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

const productController = require('../controllers/products.controller');

// app.use([path,] callback [, callback...])
router.get('/add-product', productController.getProducts);

router.post('/add-product', productController.addProduct);

module.exports = router;
