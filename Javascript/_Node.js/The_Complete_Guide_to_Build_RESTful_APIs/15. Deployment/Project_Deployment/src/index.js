const express = require('express');
const app = express();
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/logging')();
require('./startup/config')();
require('./startup/development')(app);
require('./startup/view')(app);
require('./startup/prod')(app);

module.exports = app;
