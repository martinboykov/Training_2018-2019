const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const { Rental } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const { validateRentalWithJoi } = require('../helpers/joi_validation');
// const { validateRentalsWithJoi } = require('../helpers/joi_validation');
const mongoose = require('mongoose');
const Fawn = require('Fawn');
Fawn.init(mongoose, 'rentals');

router.get('/', async function(req, res, next) {
  // next is for error middleware
  let rentals;
  try {
    rentals = await Rental.find();
  } catch (ex) {
    next(ex);
  }
  res.send(rentals);
});

// FOR SINGLE MOVIE RENTAL
router.post('/', auth, async (req, res) => {
  const { error } = validateRentalWithJoi(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) {
    return res.status(400).send('Movie not in stock.');
  }

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  try {
    new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id: movie._id }, {
          $inc: { numberInStock: -1 },
        })
        .run();

    return res.send(rental);
  } catch (ex) {
    return res.status(500).send('Something failed.');
  }
});


// FOR MULTIPLE MOVIES RENTAL
// router.post('/', auth, async function(req, res, next) {
//   // next is for error middleware
//   let rentals;
//   try {
//     const { error } = validateRentalsWithJoi(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     let customer = await Customer.findById(req.body.customer._id);
//     if (!customer) return res.status(400).send('No such customer.');

//     customer = {
//       name: customer.name,
//       _id: customer._id,
//     };

//     const movieIds = req.body.movies;
//     rentals = new Rental({
//       customer: customer,
//       movies: [],
//     });

//     // APROACH 1. With reduce + ASYNC/AWAIT
//     // ---------------------------------
//     const movies = await movieIds.reduce(async (acc, data) => {
//       const accumulator = await acc;
//       const newData = await Movie.findById(data._id);
//       accumulator.push(newData);
//       return accumulator;
//     }, Promise.resolve([]));
//     movies.forEach((element) => {
//       const p = {
//         genre: element.genre.name,
//         title: element.title,
//         dailyRentalRate: element.dailyRentalRate,
//         _id: element._id,
//       };
//       rentals.movies.push(p);
//     });
//     const transaction = async function() {
//       try {
//         const task = Fawn.Task(); // eslint-disable-line new-cap
//         for (const currentMovie of movies) {
//           task
//             .update('movies', { _id: currentMovie._id }, {
//               $inc: { numberInStock: -1 },
//             });
//         }
//         task
//           .save('rentals', rentals)
//           .run();
//         res.send(await rentals);
//       } catch (ex) {
//         res.status(500).send('Something failed.');
//       }
//     };
//     return transaction();
//   } catch (ex) {
//     return next(ex);
//   }
// });

module.exports = { rentals: router };
