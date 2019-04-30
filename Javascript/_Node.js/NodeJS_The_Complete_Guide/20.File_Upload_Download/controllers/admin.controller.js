// all the products logic in the routes

const Product = require('../models/product.model').Product;

// const Cart = require('../models/product.model');

const deleteFile = require('../util/file').deleteFile;
const fs = require('fs');

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ userId: req.user._id }).sort({ title: 1 });
        res.render('admin/products', {
            pageTitle: 'Products',
            products: products,
            path: '/admin/products',
            hasProducts: products.length > 0,
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        next(error);
    }
};

const getAddProduct = async (req, res, next) => {
    try {
        res.render('admin/add-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            product: {
                title: '',
                price: '',
                description: '',
                imageUrl: '',
            },
            errorMessage: '',
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        next(error);
    }
};

const postAddProduct = async (req, res, next) => {
    const user = req.user;
    const title = req.body.title;
    const price = parseFloat(req.body.price, 10);
    const description = req.body.description;
    let imageUrl;
    console.log(req.file);
    if (!req.file) {
        imageUrl = 'public/img/default.png';
    } else {
        if (req.file.mimetype !== 'image/png' &&
            req.file.mimetype !== 'image/jpg' &&
            req.file.mimetype !== 'image/jpeg'
        ) {
            // return res.redirect('/admin/add-product');
            return res.status(422).render('admin/add-product', {
                pageTitle: 'Edit Product',
                product: {
                    title: title,
                    price: price,
                    description: description,
                    imageUrl: '',
                },
                path: '/admin/products',
                errorMessage: 'file type is not valid.',
            });
        }
        console.log(req.file);
        imageUrl = req.file.path || 'public/img/default.png';
    }
    console.log(imageUrl);
    try {
        // const userId = req.user._id;
        const product = new Product({
            title: title,
            price: price,
            description: description,
            imageUrl: imageUrl,
            userId: user._id,
        });
        await product.save();
        return res.redirect('/admin/products');
    } catch (error) {
        console.log('An error accured!');
        return res.status(500).render('admin/add-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            product: {
                title: title,
                price: parseFloat(price, 10),
                description: description,
                imageUrl: imageUrl || 'public/img/default.png',
            },
            errorMessage: 'An error occured!',
        });
    }
};

const getEditProduct = async (req, res, next) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });
        if (product) {
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                product: product,
                path: '/admin/products',
                errorMessage: '',
            });
        } else {
            res.redirect('/admin/products');
        }
    } catch (err) {
        console.log(err);
        // 1. with render and saved data (can be done in add-product)

        // 2. with redirect to error 500 page
        // res.redirect('/500'); // only for last resort

        // 2.1. Throw new Error
        const error = new Error(err);
        error.httpStatusCode = 500;
        next(error);
    }
};

const postEditProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        console.log(product);

        if (product.userId.toString() !== req.user._id.toString()) res.redirect('/admin/products');
        else {
            product.title = req.body.title;
            product.price = req.body.price;
            if (req.file) {
                console.log(product.imageUrl);
                if (product.imageUrl !== 'public/img/default.png') {
                    deleteFile(product.imageUrl);
                    console.log('Old image succesfully deleted!');
                }
                product.imageUrl = req.file.path;
            }
            product.description = req.body.description;
            console.log(product);
            await product.save();
            res.redirect('/admin/products');
        }
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        next(error);
    }
};

const postDeleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        const deletedProduct = await Product.deleteOne({
            _id: id,
            userId: req.user._id,
        });
        if (deletedProduct.n === 1) {
            console.log(product.imageUrl);
            if (product.imageUrl !== 'public/img/default.png') {
                deleteFile(product.imageUrl);
                console.log('Product succesfully deleted!');
            }
        } else {
            console.log('You are not authorized to delete this product!');
        }
        res.redirect('/admin/products');
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        next(error);
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
