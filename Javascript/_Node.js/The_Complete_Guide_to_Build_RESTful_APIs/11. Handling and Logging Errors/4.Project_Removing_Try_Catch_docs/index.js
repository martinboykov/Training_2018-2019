const error = require('./middleware/error');
const config = require('config');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project-restful-api')
    .then(() => console.log('Connected to MongoDB database...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

/* eslint-disable no-process-env*/
const express = require('express');
const app = express();
// const bodyParser = require('body-parser'); // added to express 4.16

const { auth } = require('./routes/auth.js');


const home = require('./routes/home');
const { genres } = require('./routes/genres');
const { customers } = require('./routes/customers');
const { movies } = require('./routes/movies');
const { rentals } = require('./routes/rentals');
const { users } = require('./routes/users');

const morgan = require('morgan');
const helmet = require('helmet');
const startupDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const pug = require('pug');


// used for authorization/authentication - JWT
// Not sure why?!?!?
// -------------------
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1); // 0 - success/ 1 - error -> exit the app in case of error
}

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
    // In order to hide our passwords and jwtTokens and not show them in github repo ->
    // must be set with "set project_password=995511" and "set jwtPrivateKey=995511"
    // and create custom-environment-variables.json file in config folder
    // MUST BE SET AGGAIN EVERY TIME THE APP IS INSTALLED =>
    // set in package.json => :TODO: TO BE REMOVED???OR??
    console.log(`Mail Password: ${config.get('mail.password')}`);
    console.log(`jwtPrivateKey: ${config.get('jwtPrivateKey')}`);
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
// app.use('/', logger); // using morgan instead

// ROUTES
// -------------------------------------
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth); // same code as users.js

// error middleware
app.use(error); // error function loaded from middleware/error.js

const port = process.env.PORT || 3000;
app.listen(3000, function(err) {
    if (err) {
        throw err;
    }
    console.log(`Server is listening at port ${port}`);
});


// module.exports = mongoose; // doesnt work in genre.js?!??
