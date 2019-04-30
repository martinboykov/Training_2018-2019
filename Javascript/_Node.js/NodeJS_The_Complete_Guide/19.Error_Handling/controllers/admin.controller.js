// all the products logic in the routes

const Product = require('../models/product.model').Product;

// const Cart = require('../models/product.model');

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
                imageUrl: '' || '../img/book-1228040_640.png',
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
    const imageUrl = req.body.imageUrl || '../img/book-1228040_640.png';
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
        res.redirect('/admin/products');
    } catch (error) {
        console.log('An error accured!');
        console.log(error);
        console.log(user, title, price, description);
        res.status(500).render('admin/add-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            product: {
                title: title,
                price: parseFloat(price, 10),
                description: description,
                imageUrl: imageUrl || '../img/book-1228040_640.png',
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
        if (product.userId.toString() !== req.user._id.toString()) res.redirect('/admin/products');
        else {
            product.title = req.body.title;
            product.price = req.body.price;
            product.imageUrl = req.body.imageUrl;
            product.description = req.body.description;
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
        const deletedProduct = await Product.deleteOne({
            _id: id,
            userId: req.user._id,
        });
        if (deletedProduct.n === 1) console.log('Product succesfully deleted!');
        else {
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
