const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

const shopController = require('../controllers/shop.controller');

const auth = require('../middleware/auth');

router.get('/', shopController.getIndex);

router.get('/product-list', shopController.getProducts);

router.get('/product-list/:id', shopController.getProduct);

router.get('/orders', auth, shopController.getOrders);

router.post('/create-order', auth, shopController.postOrder);

router.get('/cart', auth, shopController.getCart);

router.post('/cart/:id', auth, shopController.postCart);

router.post('/cart/delete-product/:id', auth, shopController.deleteProductFromCart);

module.exports = router;
