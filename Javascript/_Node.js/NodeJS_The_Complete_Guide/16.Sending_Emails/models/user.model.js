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
