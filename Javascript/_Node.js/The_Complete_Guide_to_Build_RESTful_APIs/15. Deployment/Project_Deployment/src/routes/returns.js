const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const { Rental } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const { validateRentalWithJoi } = require('../helpers/joi_validation');
// const { validateRentalsWithJoi } = require('../helpers/joi_validation');
const mongoose = require('mongoose');
const Fawn = require('fawn');
Fawn.init(mongoose);


// FOR SINGLE MOVIE RENTAL
router.post('/', auth, async (req, res) => {
  // auth
  const { error } = validateRentalWithJoi(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Customer 400
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  // Movie 400
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  // no Rental 404 found for this customerId/movieId
  let rental = await Rental.find() // can use findOne => returns obj, instead of array []
    .and([{ 'customer._id': req.body.customerId },
    { 'movie._id': req.body.movieId }]);
  rental = rental[0];
  if (!rental) return res.status(404).send('No rental found.');

  // Rental 404 is already processed (with dateReturned)
  if (rental.dateReturned) {
    return res.status(404).send('Rental is already proccessed.');
  }
  rental.dateReturned = new Date();
  rental.rentalFee =
    (rental.dateReturned - rental.dateOut) *
    rental.movie.dailyRentalRate / 3600000;

  try {
    new Fawn.Task()
      .update('rentals', {
        _id: rental._id,
      }, {
          rentalFee: rental.rentalFee,
        })
      .update('rentals', {
        _id: rental._id,
      }, {
          dateReturned: rental.dateReturned,
        })
      .update('movies', { _id: movie._id }, {
        $inc: { numberInStock: +1 },
      })
      .run();

    return res.send(rental);
  } catch (ex) {
    return res.status(500).send('Something failed.');
  }
});

module.exports = { returns: router };
