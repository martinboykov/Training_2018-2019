const mongoose = require('mongoose');
const { movieSchema } = require('./movie');
const rentalsSchema = new mongoose.Schema({
    customer: {
        name: String,
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
        },
    },
    movies: [],
});
const Rentals = mongoose.model('Rentals', rentalsSchema);

module.exports = { Rentals, rentalsSchema };
