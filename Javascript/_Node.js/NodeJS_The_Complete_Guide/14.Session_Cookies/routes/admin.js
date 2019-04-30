const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

const adminController = require('../controllers/admin.controller');

router.get('/products', adminController.getProducts);

router.get('/add-product', adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct);

router.post('/delete-product/:id', adminController.postDeleteProduct);

router.get('/edit-product/:id', adminController.getEditProduct);

router.post('/edit-product/:id', adminController.postEditProduct);

module.exports = router;
