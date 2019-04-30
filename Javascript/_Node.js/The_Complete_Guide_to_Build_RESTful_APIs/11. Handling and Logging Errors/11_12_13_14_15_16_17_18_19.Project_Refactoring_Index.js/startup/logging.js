const winston = require('winston');
require('winston-mongodb');
module.exports = function() {
    // --------------------
    // ERROR LOGGING
    // ------------------
    // 1.THROUGH EXPRESS
    // ------------------
    // demo Error thrown in routes/users.js for GET http://127.0.0.1:3000/api/users route
    winston.add(winston.transports.File, { filename: 'logfile.log' });
    // default level is info
    winston.add(winston.transports.MongoDB, {
        db: 'mongodb://localhost/project-restful-api',
    });
    // winston catches only routes errors (through express middleware)
    // if you throw error here (before express is used (app.use())) ->
    // the error will crash the app and wont be handelt by winston (saved to log/db)

    // 2.ANYWHERE ELSE (SYNC)
    // ------------------
    // doesnt catch async errors (Promise rejections)
    // process.on('uncaughtException', (ex) => {
    //     console.log('WE GOT UNCAUGHT EXEPTION');
    //     winston.error(ex.message, ex);
    //     process.exit(1); // 1 - means failure
    // });
    winston.handleExceptions(
        new winston.transports.File({ filename: 'uncaughtException.log' }),
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
    );
    // testing the UncaughtExceptions outside express middleware:
    // throw new Error('UncaughtException outside express midleware test!'); // testing winston logger

    // 3.ANYWHERE ELSE (ASYNC)
    // ------------------
    // doesnt catch async errors (Promise rejections)
    // process.on('unhandledRejection', (ex) => {
    //     console.log('WE GOT UNHANDLELD EXEPTION');
    //     winston.error(ex.message, ex);
    //     process.exit(1); // 1 - means failure
    // });
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
    // testing the UnhandledRejections outside express middleware:
    // const p = Promise.reject(
    //     new Error('UnhandledRejection outside express midleware test!'));
    // p.then(() => console.log('Done'));
 };
