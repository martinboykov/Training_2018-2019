const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap

const { User } = require('../models/user');
const { validateUserWithJoi } = require('../helpers/joi_validation');

router.get('/', async function(req, res) {
    let users;
    try {
        users = await User.find().sort({ name: 1 });
        users = users.map((user) => {
            return _.pick(user, ['_id', 'name', 'email']);
        });
    } catch (error) {
        console.log(error.message);
    }
    return res.send(users);
});
router.get('/:id', async function(req, res) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (!user) return res.status(400).send('No such user.');
    } catch (error) {
        console.log(error.message);
    }
    return res.send(_.pick(user, ['_id', 'name', 'email']));
    // return res.send(user);
});
router.post('/', async function(req, res) {
    try {
        const { error } = validateUserWithJoi(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already exist.');

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        // Encrypting the password bofore saving to db
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);

        // This app will operate as (Single Sign On):
        // When you register to server,
        user = await user.save();
        // he will sent token in res.header,
        // which will be saved on client browser for further comunication =>
        // => no need for login to perform authorized actions (CRUD)??
        // generateAuthToken from models/user.js
        const token = user.generateAuthToken();

        return res.header('x-auth-token', token)
            .res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
});

module.exports = { users: router };
