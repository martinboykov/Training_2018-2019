const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items: {
        type: Array,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    user: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order, orderSchema };
