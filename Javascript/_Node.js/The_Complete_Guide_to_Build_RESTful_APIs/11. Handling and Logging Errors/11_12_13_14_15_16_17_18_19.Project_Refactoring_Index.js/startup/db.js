const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
    mongoose.connect('mongodb://localhost/project-restful-api')
        .then(() => winston.info('Connected to MongoDB database...'));
        // we already are catching the errors with winston.uncoughterror.....
        // .catch((err) => console.error('Could not connect to MongoDB...', err));
};
