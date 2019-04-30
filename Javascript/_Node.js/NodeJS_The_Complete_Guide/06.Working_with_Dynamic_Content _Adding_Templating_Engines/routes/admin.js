const path = require('path');
const rootDir = require('../util/path');
const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap

const products = [];

// app.use([path,] callback [, callback...])
router.get('/add-product', (req, res, next) => {
  console.log('add-product middleware');
  // res.sendFile(path.join(__dirname, '..', 'views', 'app-product.html'));
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  res.render('add-product', {
    pageTitle: 'Add Product',
    products: products,
    path: '/admin/add-product',
    hasProducts: products.length > 0,
  });
  // res.send(`
  //   <form action="/admin/product" method="POST">
  //   <input type="text" name="title">
  //   <button type="submit">Send</button>
  //   </form>
  //   `);
});
router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

module.exports = { router, products };
