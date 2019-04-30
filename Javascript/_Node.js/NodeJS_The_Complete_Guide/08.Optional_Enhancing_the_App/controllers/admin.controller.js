// all the products logic in the routes

const productsDb = require('../db/products.db');


const Product = require('../models/product.model');

// const products = (async () => await productsDb.getAll())();

const getAddProduct = async (req, res, next) => {
  const products = await productsDb.getAll();
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    products: products,
    path: '/admin/add-product',
    hasProducts: products.length > 0,
  });
};

const postAddProduct = async (req, res, next) => {
  await productsDb.add(new Product(req.body.title,
      req.body.imageUrl,
      req.body.description,
      req.body.price));
  res.redirect('/');
};

const getProducts = async (req, res, next) => {
  const products = await productsDb.getAll();
  res.render('admin/products', {
    pageTitle: 'Products',
    products: products,
    path: '/admin/products',
    hasProducts: products.length > 0,
  });
};

module.exports = { getAddProduct, getProducts, postAddProduct };
