const path = require('path');
const rootDir = require('../util/path');
const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const adminData = require('./admin');
const products = adminData.products;

// app.use([path,] callback [, callback...])
router.get('/', (req, res, next) => {
  console.log('shop.js', products);
  // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  res.render('shop', {
    pageTitle: 'Shop',
    products: products,
    path: '/',
    hasProducts: products.length > 0,
  });
});

module.exports = router;
