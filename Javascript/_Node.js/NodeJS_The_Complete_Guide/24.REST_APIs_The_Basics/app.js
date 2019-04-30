const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form> -> url data1=....&data2=....&etc...
app.use(bodyParser.json()); // application/json (parses json data)

app.use((req, res, next) => { // every response we sent will have these headers
    req.setHeader('Access-Control-Allow-Origin', '*'); // '*' - means no restriction === allowed to any domain to access our server
    req.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // specifies the methods that can be used to be usable from outside
    req.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // headers allowed client to set on their requests (some defaults are always allowed)
    next();
});

app.use('/feed', feedRoutes);

app.listen(8080, () => console.log(`Server listening on port ${8080}!`));
