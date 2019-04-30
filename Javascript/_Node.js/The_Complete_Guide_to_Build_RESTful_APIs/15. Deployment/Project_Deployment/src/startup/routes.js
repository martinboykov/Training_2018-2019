const express = require('express');
const home = require('../routes/home');
const { auth } = require('../routes/auth.js');
const { genres } = require('../routes/genres');
const { customers } = require('../routes/customers');
const { movies } = require('../routes/movies');
const { rentals } = require('../routes/rentals');
const { returns } = require('../routes/returns');
const { users } = require('../routes/users');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json()); // for parsing application/json, since 4.16
  app.use(express.urlencoded({ extended: true })); // for forms data
  app.use(express.static('public'));
  app.use('/', home);
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/returns', returns);
  app.use('/api/users', users);
  app.use('/api/auth', auth); // same code as users.js
  // error middleware
  app.use(error); // error function loaded from middleware/error.js
};
