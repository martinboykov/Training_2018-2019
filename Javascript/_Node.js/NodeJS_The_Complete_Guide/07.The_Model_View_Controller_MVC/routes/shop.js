const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

const productController = require('../controllers/products.controller');

router.get('/', productController.shopGetProducts);

module.exports = router;
