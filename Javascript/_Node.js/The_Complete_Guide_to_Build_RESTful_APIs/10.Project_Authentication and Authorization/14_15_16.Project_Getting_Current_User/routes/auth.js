const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap

const { User } = require('../models/user');
const { validateAuthWithJoi } = require('../helpers/joi_validation');

// AUTHENTICATION
router.post('/', async function(req, res) {
    try {
        const { error } = validateAuthWithJoi(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password.');

        // validating the password using bcrypt
        // ----------------------------------
        // user.password contains the salt
        // when using compare method, bcrypt will use that salt,
        // to rehash that password ->
        // compare with the one from body
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid email or password.');
        }


        // JSON WEB TOKEN (JWT)
        // --------------
        // When user login to the server, the server generates this JWT
        // and give it to the client so that next time
        // he tries to perform task that requires authorization
        // wont have to login aggain
        // For webapplication - can use local storage to store the JWT
        // generateAuthToken from models/user.js
        const token = user.generateAuthToken();
        return res.send(token); // valid login
        // will generate token and send it to the client
        // eslint-disable-next-line max-len
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhlYThhZTgxMDMyODQyNzhhNzFlMzYiLCJpYXQiOjE1MzYwNzczNjd9.rYGd8xk338a3jAdgf_2Z-XzpyC9NX6qB94JGmzAhTuo
        // IF you copy/past the token in jwt.io
        // eslint-disable-next-line max-len
        // youll get the payload json obj {"_id": "5b8ea8ae8103284278a71e36",  "iat": 1536077367 }
        // "iat" is a timestamp that we can use to get the time of
        // creation of the token
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
});

module.exports = { auth: router };
