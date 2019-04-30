const winston = require('winston');

module.exports = function(err, req, res, next) {
    // (message, obj-metadata(standart properties of error obj in javascript))
    winston.error(err.message, err);
    // error
    // warn
    // info
    // verbose
    // debug
    // silly
    // // Log the exeption (could be several lines long - separate module)
    // console.log(error.message);
    // // Send to client
    return res.status(500).send('Something failed');
};
