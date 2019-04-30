// all the products logic in the routes

const Product = require('../models/product.model').Product;

const User = require('../models/user.model').User;

const Order = require('../models/order.model').Order;

const getIndex = async (req, res, next) => {
    try {
        const products = await Product.find().sort({ title: 1 });
        res.render('shop/index', {
            pageTitle: 'Shop',
            products: products,
            path: '/',
            hasProducts: products.length > 0,
        });
    } catch (err) {
        console.log(err);
    }
};

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find().sort({ title: 1 });
        res.render('shop/product-list', {
            pageTitle: 'Shopping list',
            products: products,
            path: '/product-list',
            hasProducts: products.length > 0,
        });
    } catch (err) {
        console.log(err);
    }
};

const getProduct = async (req, res, next) => {
    // const product = (await Product.findAll({ where: { id: req.params.id } }))[0]; // returns array
    // const product = await Product.find({ where: { id: req.params.id } }); // returns  single element
    const product = await Product.findById(req.params.id); // returns  single element

    res.render('shop/product-detail', {
        pageTitle: 'Product detail',
        product: product,
        path: '/product-list',
    });
};


const getCart = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const cart = user.cart;
    const products = cart.items;
    const totalPrice = cart.totalPrice;
    res.render('shop/cart', {
        pageTitle: 'Shopping Cart',
        products: products,
        totalPrice: Math.round(totalPrice * 100) / 100,
        path: '/cart',
        hasProducts: products.length > 0,
    });
};

const postCart = async (req, res, next) => {
    const prodId = req.params.id;
    const user = await User.findById(req.user._id);
    const product = await Product.findById(prodId);
    let index;
    const productSame = user.cart.items.find((item, i) => {
        index = i;
        return (item.prodId).toString() === (product._id).toString();
    });
    console.log(productSame);
    if (productSame) {
        user.cart.items[index].qty += 1;
    } else {
        user.cart.items.push({ prodId: product._id, title: product.title, price: product.price, qty: 1 });
    }
    user.cart.totalPrice = Math.round((user.cart.totalPrice + product.price) * 100) / 100;
    await User.updateOne(
        { _id: req.user._id },
        {
            $set: { cart: user.cart },
        }
    );
    console.log('Product added to cart');
    return res.redirect('/cart');
};


const deleteProductFromCart = async (req, res, next) => {
    const prodId = req.params.id;
    const user = await User.findById(req.user._id);
    let index;
    const productToDelete = user.cart.items.find((item, i) => {
        index = i;
        return (item.prodId).toString() === (prodId).toString();
    });

    user.cart.totalPrice -= productToDelete.price * productToDelete.qty;
    user.cart.items.splice(index, 1);
    const updatedUser = await User.updateOne(
        { _id: user._id },
        {
            $set: { cart: user.cart },
        }
    );
    console.log('Product Deleted From Cart!');
    return res.redirect('/cart');
};

const postOrder = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const order = new Order({
        items: user.cart.items,
        totalPrice: user.cart.totalPrice,
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
        },
    });
    await order.save();
    await User.updateOne(
        { _id: user._id },
        {
            $set: {
                cart: {
                    items: [],
                    totalPrice: 0,
                },
            },
        }
    );
    return res.redirect('/orders');
};

const getOrders = async (req, res, next) => {
    const orders = await Order.find();
    res.render('shop/orders', {
        pageTitle: 'Orders',
        orders: orders,
        path: '/orders',
    });
};

module.exports = {
    getProducts,
    getProduct,
    getIndex,
    getCart,
    postCart,
    deleteProductFromCart,
    getOrders,
    postOrder,
};
