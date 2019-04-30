// all the products logic in the routes

const Product = require('../models/product.model');

// const Cart = require('../models/product.model');

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.getAll();
    res.render('admin/products', {
      pageTitle: 'Products',
      products: products,
      path: '/admin/products',
      hasProducts: products.length > 0,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAddProduct = async (req, res, next) => {
  try {
    res.render('admin/add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
    });
  } catch (error) {
    console.log(error);
  }
};

const postAddProduct = async (req, res, next) => {
  try {
    const title = req.body.title;
    const price = parseFloat(req.body.price, 10);
    const description = req.body.description;
    const imageUrl = req.body.imageUrl || '../img/book-1228040_640.png';
    const userId = req.user._id;
    const product = new Product(title, price, description, imageUrl, userId);
    await product.save();
    res.redirect('/admin/products');
  } catch (error) {
    console.log(error);
  }
};

const getEditProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      product: product,
      path: '/admin/products',
    });
  } catch (err) {
    console.log(err);
  }
};

const postEditProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = {
      title: req.body.title,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
    };
    await Product.updateOne(id, updatedData);
    res.redirect('/admin/products');
  } catch (err) {
    console.log(err);
  }
};

const postDeleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user;
    await Product.deleteOne(id, user);
    res.redirect('/admin/products');
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
  getProducts,
};
