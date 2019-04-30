const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

const adminController = require('../controllers/admin.controller');

const auth = require('../middleware/auth');

router.get('/products', adminController.getProducts);

router.get('/add-product', auth, adminController.getAddProduct);

router.post('/add-product', auth, adminController.postAddProduct);

router.post('/delete-product/:id', auth, adminController.postDeleteProduct);

router.get('/edit-product/:id', auth, adminController.getEditProduct);

router.post('/edit-product/:id', auth, adminController.postEditProduct);

module.exports = router;
