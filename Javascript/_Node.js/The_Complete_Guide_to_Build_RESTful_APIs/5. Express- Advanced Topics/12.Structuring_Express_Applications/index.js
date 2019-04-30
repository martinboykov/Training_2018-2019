const config = require('config');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const home = require('./routes/home');

const logger = require('./middleware/logger');
const auth = require('./auth');
const helmet = require('helmet');
const morgan = require('morgan');
// setting the namespace ('app:startup') or ('app:db')
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

if (app.get('env') === 'development') {
    // Configuration (dev/prod) - after installing "config" package
    // https://www.npmjs.com/package/config
    console.log(`app: ${app.get('env')}`);
    console.log(`Application Name: ${config.get('name')}`);
    console.log(`Mail Server: ${config.get('mail.host')}`);
    // In order to hide our passwords and not show them in github repo ->
    // must be set with "set app_password=995511"
    // and create custom-environment-variables.json file in config folder
    // console.log(`Mail Password: ${config.get('mail.password')}`);
    console.log('Mail Password: look 7.Configuration');
}


// VIEW ENGINE
// ----------------------------------------------------
// ----------------------------------------------------
app.set('view engine', 'pug'); // using pug
app.set('views', ('./views')); // default

// ADDING MIDDLEWARE
// ----------------------------------------------------
// ----------------------------------------------------
// Middleware - every function that takes request object and eather returns
// response to the client or passes control to another middleware function

// THIRD PARTY
// --------------------------------
// 6. Helmet /for security /must be on top as possible/ (third-party)
// https://expressjs.com/en/resources/middleware.html
app.use(helmet());

// 7. morgan - same as 1. logger (third-party)
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan middleware is enabled');
}
// 7.1 Better debugging option
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan middleware is enabled');
}

// CUSTOM
// --------------------------------
// 1. Logging (custom)
// all requests to this router will first hit this middleware
// app.use(logger); (using morgan instead)

// 2. Authenticating (custom)
app.use(auth);

// BUILD IN
// --------------------------------
// 3. express.json() (build-in) - if the req has json obj it will be parsed into
// obj -> req.body
app.use(express.json());

// 4. urlencoded() (build-in) - parses incomming requests
// with url encoded payloads key=value&key=value (html forms)
app.use(express.urlencoded({ extended: true })); // so we can use after req.body
// { extended: true } -> This object will contain key-value pairs,
// where the value can be a string or array (when extended is false),
// or any type (when extended is true).

// 5. Static files (build-in)
app.use(express.static('public')); // loads files from public folder


// DATABASE
// ----------------------------------------------------
// ----------------------------------------------------


// ROUTING
// ----------------------------------------------------
// ----------------------------------------------------
// root rout
app.use('/', home);

// All routes '/api/courses' are in ./routes/courses file
app.use('/api/courses', courses);

// PORT
/* eslint-disable no-process-env */
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Listening on port ${port}...`);
});


