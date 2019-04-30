// all the products logic in the routes

const productsDb = require('../db/products.db');

const Cart = require('../models/cart.model');

const getIndex = async (req, res, next) => {
  const produts = await productsDb.getAll();
  res.render('shop/index', {
    pageTitle: 'Shop',
    products: produts,
    path: '/',
    hasProducts: produts.length > 0,
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

const getProduct = async (req, res, next) => {
  const productData = await productsDb.getById(req.params.id);
  const product = productData;
  res.render('shop/product-detail', {
    pageTitle: 'Product detail',
    product: product,
    path: '/product-list',
  });
};

const getCart = async (req, res, next) => {
  const data = await Cart.getAllProdudcts();
  const products = data.products;
  const totalPrice = data.totalPrice;
  res.render('shop/cart', {
    pageTitle: 'Shopping Cart',
    products: products,
    totalPrice: Math.round(totalPrice * 100) / 100,
    path: '/cart',
    hasProducts: products.length > 0,
  });
};
const postCart = async (req, res, next) => {
  // const id = req.body.id;
  const id = req.params.id;
  const productData = await productsDb.getById(id);
  const product = productData.productFound;
  Cart.addProduct(id, product.price);
  res.redirect('/product-list');
};
const deleteProductFromCart = async (req, res, next) => {
  // const id = req.body.id;
  const id = req.params.id;
  const productData = await Cart.getProductById(id);
  console.log(productData);
  const product = productData.productFound;
  const index = productData.index;
  await Cart.deleteProduct(index, product.price);
  res.redirect('/cart');
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


module.exports = {
  getProducts,
  getProduct,
  getIndex,
  getCart,
  postCart,
  deleteProductFromCart,
  getCheckout,
  getOrders,
};
