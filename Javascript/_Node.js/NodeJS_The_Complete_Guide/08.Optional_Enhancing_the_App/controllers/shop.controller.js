// all the products logic in the routes

const productsDb = require('../db/products.db');

const getIndex = async (req, res, next) => {
  const products = await productsDb.getAll();
  res.render('shop/index', {
    pageTitle: 'Shop',
    products: products,
    path: '/',
    hasProducts: products.length > 0,
  });
};

const getProducts = async (req, res, next) => {
  const products = await productsDb.getAll();
  res.render('shop/product-list', {
    pageTitle: 'Shopping list',
    products: products,
    path: '/product-list',
    hasProducts: products.length > 0,
  });
};

const getCart = async (req, res, next) => {
  const products = await productsDb.getAll();
  res.render('shop/cart', {
    pageTitle: 'Shopping Cart',
    products: products,
    path: '/cart',
    hasProducts: products.length > 0,
  });
};

const getCheckout = async (req, res, next) => {
  const products = await productsDb.getAll();
  res.render('shop/checkout', {
    pageTitle: 'Shop Checkout',
    products: products,
    path: '/checkout',
    hasProducts: products.length > 0,
  });
};
const getOrders = async (req, res, next) => {
  const products = await productsDb.getAll();

  res.render('shop/orders', {
    pageTitle: 'Orders',
    products: products,
    path: '/orders',
    hasProducts: products.length > 0,
  });
};


module.exports = { getProducts, getIndex, getCart, getCheckout, getOrders };
