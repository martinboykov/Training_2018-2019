const winston = require('winston');
const express = require('express');
const app = express();
require('./startup/db')();
require('./startup/third-party')(app);
require('./startup/routes')(app);
require('./startup/logging')();
require('./startup/config')();
require('./startup/development')(app);
require('./startup/view')(app);
/* eslint-disable no-process-env*/
const port = process.env.PORT || 3000;
app.listen(3000, function(err) {
    if (err) {
        throw err;
    }
    winston.info(`Server is listening at port ${port}`);
});

// :TODO
// its enabled only for toutes/users.js
// :TODO - to remove all try/catch, so can be enabled here for entire app
// :TODO - then move it to /startup/logging.js
// require('express-async-errors');

// const dbDebugger = require('debug')('app:db');
// const bodyParser = require('body-parser'); // added to express 4.16


// VIEW ENGINE
// -------------------------------------
// -------------------------------------
// moved to /startup/view.js

// ENVIRONMENT
// -------------------------------------
// -------------------------------------
// moved to /startup/development.js

// used for authorization/authentication - JWT
// Not sure why?!?!?
// -------------------


// DATABASE
// -------------------------------------
// -------------------------------------
// dbDebugger('Debugging the db (Database)');
// moved to /startup/db.js

// MIDDLEWARE
// -------------------------------------
// -------------------------------------

// THIRD PARTY
// -------------------------------------
// moved to /startup/third-party.js


// INTEGRATED
// -------------------------------------
// moved to startup/routes


// CUSTOM
// -------------------------------------
// Logger
// app.use('/', logger); // using morgan instead

// ROUTES
// -------------------------------------
// moved to startup/routes


