const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = require('./product.model');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetToken: {
        type: String,
        required: false,
    },
    resetTokentExpiration: {
        type: Date,
        required: false,
    },
    cart: {
        items: [{
            prodId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            title: { type: String, required: true },
            price: { type: Number, required: true },
            qty: { type: Number, required: true },
        }],
        totalPrice: {
            type: Number,
        },
    },
});

const User = mongoose.model('User', userSchema);

module.exports = { User, userSchema };
