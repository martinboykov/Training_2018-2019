const winston = require('winston');
const app = require('./index');
/* eslint-disable no-process-env*/
const port = process.env.PORT || 3000;
app.listen(port, function(err) {
    if (err) {
        throw err;
    }
    winston.info(`Server is listening at port ${port}`);
});
