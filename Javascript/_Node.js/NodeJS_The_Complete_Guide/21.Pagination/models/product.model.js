const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: Schema.Types.Mixed,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product, productSchema };
