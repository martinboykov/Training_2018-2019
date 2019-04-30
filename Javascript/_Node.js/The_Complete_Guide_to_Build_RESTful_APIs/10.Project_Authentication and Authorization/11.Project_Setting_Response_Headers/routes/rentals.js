const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const { Rentals } = require('../models/rentals');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const { validateRentalsWithJoi } = require('../helpers/joi_validation');
const mongoose = require('mongoose');
const Fawn = require('Fawn');
Fawn.init(mongoose);

router.get('/', async function(req, res) {
    let rentals;
    try {
        rentals = await Rentals.find();
    } catch (error) {
        console.log(error.message);
    }
    return res.send(rentals);
});

router.post('/', async function(req, res) {
    let rentals;
    try {
        const { error } = validateRentalsWithJoi(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let customer = await Customer.findById(req.body.customer._id);
        if (!customer) return res.status(400).send('No such customer.');

        customer = {
            name: customer.name,
            _id: customer._id,
        };

        const movieIds = req.body.movies;
        rentals = new Rentals({
            customer: customer,
            movies: [],
        });

        // APROACH 1. With reduce + ASYNC/AWAIT
        // ---------------------------------
        const movies = await movieIds.reduce(async (acc, data) => {
            const accumulator = await acc;
            const newData = await Movie.findById(data._id);
            accumulator.push(newData);
            return accumulator;
        }, Promise.resolve([]));
        movies.forEach((element) => {
            const p = {
                genre: element.genre.name,
                title: element.title,
                dailyRentalRate: element.dailyRentalRate,
                _id: element._id,
            };
            rentals.movies.push(p);
        });
        const transaction = async function() {
            try {
                const task = Fawn.Task(); // eslint-disable-line new-cap
                for (const currentMovie of movies) {
                    task
                        .update('movies', { _id: currentMovie._id }, {
                            $inc: { numberInStock: -1 },
                        });
                }
                task
                    .save('rentals', rentals)
                    .run();
                res.send(await rentals);
            } catch (ex) {
                res.status(500).send('Something failed.');
            }
        };
        transaction();
    } catch (error) {
        console.log(error.message);
    }
    return {};
});

module.exports = { rentals: router };
