// all the products logic in the routes

const productsDb = require('../db/products.db');


const Product = require('../models/product.model');

// const products = (async () => await productsDb.getAll())();

const getProducts = async (req, res, next) => {
  const products = await productsDb.getAll();
  res.render('add-product', {
    pageTitle: 'Add Product',
    products: products,
    path: '/admin/add-product',
    hasProducts: productsDb.length > 0,
  });
};

const shopGetProducts = async (req, res, next) => {
  const products = await productsDb.getAll();
  res.render('shop', {
    pageTitle: 'Shop',
    products: products,
    path: '/',
    hasProducts: products.length > 0,
  });
};

const addProduct = async (req, res, next) => {
  await productsDb.add(new Product(req.body.title));
  res.redirect('/');
};


module.exports = { getProducts, addProduct, shopGetProducts };
