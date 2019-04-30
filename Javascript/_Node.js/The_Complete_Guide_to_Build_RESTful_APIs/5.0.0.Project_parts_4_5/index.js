/* eslint-disable no-process-env*/
const express = require('express');
const app = express();
// const bodyParser = require('body-parser'); // added to express 4.16

const logger = require('./logger.js');
const auth = require('./auth.js');
const config = require('config');

const home = require('./routes/home');
const { genres, db } = require('./routes/genres');

const morgan = require('morgan');
const helmet = require('helmet');
const startupDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');

const pug = require('pug');

// VIEW ENGINE
// -------------------------------------
// -------------------------------------
app.set('view engine', 'pug');
app.set('views', ('./views')); // default

// ENVIRONMENT
// -------------------------------------
// -------------------------------------
if (app.get('env') === 'development') {
  console.log(`Applicatoin is in ${app.get('env')} mode`);
  console.log(`Application Name: ${config.get('name')}`);
  console.log(`Mail Server: ${config.get('mail.host')}`);
  // In order to hide our passwords and not show them in github repo ->
  // must be set with "set app_password=995511"
  // and create custom-environment-variables.json file in config folder
  // console.log(`Mail Password: ${config.get('mail.password')}`);
}

// DATABASE
// -------------------------------------
// -------------------------------------
// dbDebugger('Debugging the db (Database)');

// MIDDLEWARE
// -------------------------------------
// -------------------------------------

// THIRD PARTY
// -------------------------------------
app.use(helmet());
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan middleware is enabled');
}

// INTEGRATED
// -------------------------------------
app.use(express.json()); // for parsing application/json, since 4.16
app.use(express.urlencoded({ extended: true })); // for forms data
app.use(express.static('public'));

// CUSTOM
// -------------------------------------
// Logger
// app.use('/', logger);

// Authenticating
app.use('/', auth);


// ROUTES
// -------------------------------------

app.use('/', home);
app.use('/api/genres', genres);


const port = process.env.PORT || 3000;
app.listen(3000, function(err) {
  if (err) {
    throw err;
  }
  console.log(`Server is listening at port ${port}`);
});


