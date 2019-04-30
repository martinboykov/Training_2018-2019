require('express-async-errors');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap

const { User } = require('../models/user');
const { validateUserWithJoi } = require('../helpers/joi_validation');

// No try catch block, as there is express-async-errors installed


router.get('/', auth, admin, async function(req, res) {
    throw new Error('Could not get the users'); // testing winston logger
    let users = await User.find().sort({ name: 1 });
    users = users.map((user) => {
        return _.pick(user, ['_id', 'name', 'email']);
    });
    return res.send(users);
});

router.get('/id/:id', auth, admin, async function(req, res, next) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send('No such user.');

    return res.send(_.pick(user, ['_id', 'name', 'email']));
});

router.get('/me', auth, async function(req, res) {
    // getting user data without the password
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(400).send('No such user.');
    return res.send(user);
});
router.post('/', async function(req, res) {
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
        .send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = { users: router };
