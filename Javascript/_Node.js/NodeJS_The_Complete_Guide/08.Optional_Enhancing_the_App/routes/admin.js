const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

const adminController = require('../controllers/admin.controller');

router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.postAddProduct);

module.exports = router;
