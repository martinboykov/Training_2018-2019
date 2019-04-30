const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

const shopController = require('../controllers/shop.controller');

router.get('/', shopController.getIndex);

router.get('/product-list', shopController.getProducts);

router.get('/orders', shopController.getOrders);

router.get('/cart', shopController.getCart );

router.get('/checkout', shopController.getCheckout);

module.exports = router;
