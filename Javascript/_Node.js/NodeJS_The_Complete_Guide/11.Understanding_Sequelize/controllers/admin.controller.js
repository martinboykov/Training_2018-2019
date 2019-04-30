// all the products logic in the routes

const Product = require('../models/product.model');

const Cart = require('../models/product.model');

const getProducts = async (req, res, next) => {
  try {
    // const products = await req.user.getProducts({ where: { userId: req.user.id } });
    const products = await Product.findAll({ where: { userId: req.user.id } });
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
    const products = await Product.findAll();
    res.render('admin/add-product', {
      pageTitle: 'Add Product',
      products: products,
      path: '/admin/add-product',
      hasProducts: products.length > 0,
    });
  } catch (error) {
    console.log(error);
  }
};

const postAddProduct = async (req, res, next) => {
  try {
    // automatically set userID with req.user.createProduct()
    const newProduct = await req.user.createProduct({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl || '../img/book-1228040_640.png',

    });

    // manualy  set userId: req.user.id

    // const newProduct = await Product.create({
    //   title: req.body.title,
    //   price: req.body.price,
    //   description: req.body.description,
    //   imageUrl: req.body.imageUrl || '../img/book-1228040_640.png',
    //   userId: req.user.id,
    // });

    console.log(newProduct);
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

const getEditProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (req.user.id === product.userId) {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        product: product,
        path: '/admin/products',
      });
    } else {
      console.log('Only user, that created the Product can edit it!');
      res.redirect('/admin/products');
    }
  } catch (err) {
    console.log(err);
  }
};

const postEditProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    product.title = req.body.title;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    product.description = req.body.description;
    await product.save();
    res.redirect('/admin/products');
  } catch (err) {
    console.log(err);
  }
};

const postDeleteProduct = async (req, res, next) => {
  try {
    // await Product.destroy({ where: { id: req.params.id } });
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
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
