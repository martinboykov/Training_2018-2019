// all the products logic in the routes

const productsDb = require('../db/products.db');

const Product = require('../models/product.model');

const Cart = require('../models/cart.model');

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
  const newProduct = new Product(req.body.title,
    req.body.price,
    req.body.description,
    req.body.imageUrl);
  await productsDb.add(newProduct);
  res.redirect('/');
};

const getEditProduct = async (req, res, next) => {
  const id = req.params.id;
  const productData = await productsDb.getById(id);
  const product = productData.productFound;
  const index = productData.index;
  console.log(product);
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    product: product,
    path: '/admin/products',
  });
};

const postEditProduct = async (req, res, next) => {
  const id = req.params.id;
  const productData = await productsDb.getById(id);
  const product = productData.productFound;
  const index = productData.index;
  const newProduct = new Product(req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price);
  newProduct.id = product.id;
  await productsDb.edit(index, newProduct);
  res.redirect('/admin/products');
};

const postDeleteProduct = async (req, res, next) => {
  const id = req.params.id;
  const productData = await productsDb.getById(id);
  const productCartData = await Cart.getProductById(id);
  console.log(productData);
  const priceOfDeletedProduct = productData.productFound.price;
  const indexProductDb = productData.index;
  const indexCartDb = productCartData.index;
  if (productCartData) {
    Promise.all([
      productsDb.deleteProduct(indexProductDb),
      Cart.deleteProdudct(indexCartDb, priceOfDeletedProduct)])
      .then(() => {
        res.redirect('/admin/products');
      });
  } else {
    await productsDb.deleteProduct(indexProductDb);
    res.redirect('/admin/products');
  }
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

module.exports = {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
  getProducts,
};
