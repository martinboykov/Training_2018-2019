const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

const shopController = require('../controllers/shop.controller');

router.get('/', shopController.getIndex);

router.get('/product-list', shopController.getProducts);

router.get('/product-list/:id', shopController.getProduct);

 router.get('/orders', shopController.getOrders);

router.post('/create-order', shopController.postOrder);

router.get('/cart', shopController.getCart);

router.post('/cart/:id', shopController.postCart );

router.post('/cart/delete-product/:id', shopController.deleteProductFromCart );

// router.get('/checkout', shopController.getCheckout);

module.exports = router;
