/* eslint-disable no-process-env*/
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); // build in node

const User = require('../models/user.model').User;

// setting Email sending via Sendgrid/nodemailer
const nodemailer = require('nodemailer');
const sendgridransport = require('nodemailer-sendgrid-transport');
const options = {
    auth: {
        // api_user: 'martinboykov', // from https://app.sendgrid.com/settings/account
        api_key: process.env.SENGRID_PW, // from https://app.sendgrid.com/settings/api_keys
    },
};
const client = nodemailer.createTransport(sendgridransport(options));
// continues in postSignup()....


// adding Validation (video - 286)
// one part is in routes/auth
const { check, validationResult } = require('express-validator/check');

const getLogin = async (req, res, next) => {
    // console.log(req.session.isLoggedIn);
    // console.log(req.cookies);
    let message = req.flash('error');
    let errorMessageNoSuchUser;
    let errorMessagePassword;
    if (message.length > 0) {
        message = message[0];
        if (message === 'No such user!') errorMessageNoSuchUser = message; else errorMessageNoSuchUser = null;
        if (message === 'Invalid password') errorMessagePassword = message; else errorMessagePassword = null;
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login', // for navigation only -> active route (see header.ejs)
        pageTitle: 'Login',
        errorMessageNoSuchUser: errorMessageNoSuchUser,
        errorMessagePassword: errorMessagePassword,
    });
};
const postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user) {
        // req.flash('key', 'message)
        req.flash('error', 'No such user!');
        res.redirect('/login');
    } else {
        const validPassword = await bcrypt.compare(
            password,
            user.password);
        if (!validPassword) {
            req.flash('error', 'Invalid password');
            res.redirect('/login');
        } else {
            // using session
            req.session.isLoggedIn = true; // adds connect.sid (session ID) in the Browser with value = s%3AC8rUK9B24dQloAW_rUHTXRrXb-jCsc9s.Bc0r%2FPz3VMYsThPJBoQoCWqz1P6mHLjBaPZ20njmofo
            req.session.user = user;
            req.session.save((err) => {
                console.log(err);
                console.log('Login successfully!');
                res.redirect('/');
            });
        }
    }
};

const getSignup = async (req, res, next) => {
    // console.log(req.session.isLoggedIn);
    // console.log(req.cookies);

    // validated with express-validator ahead of time
    // ----------------------------------------------
    // let message = req.flash('error');
    // let errorMessageUsername;
    // let errorMessageUserAlreadyExist;
    // let errorMessagePassword;
    // if (message.length > 0) {
    //     message = message[0];
    //     if (message === 'Username must be at least 4 characters long!') errorMessageUsername = message;
    //     else errorMessageUsername = null;
    //     if (message === 'This email is used!') errorMessageUserAlreadyExist = message;
    //     else errorMessageUserAlreadyExist = null;
    //     if (message === 'Passwords do not match!') errorMessagePassword = message;
    //     else errorMessagePassword = null;
    // } else {
    //     message = null;
    // }
    res.render('auth/signup', {
        path: '/signup', // for navigation only -> active route (see header.ejs)
        pageTitle: 'Signup',

        // all null, as validation is done ahead of time via express-validator in postSignup
        errorMessageUsername: null,
        errorMessageUserAlreadyExist: null,
        errorMessagePassword: null,
        errorMessagePasswordConfirm: null,
        oldInput: { username: '', email: '', password: '', passwordConfirm: '' },
    });
};

const postSignup = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    // validation with express-vlidation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('auth/signup', {
            path: '/signup', // for navigation only -> active route (see header.ejs)
            pageTitle: 'Signup',
            errorMessageUsername: errors.array()[0].param === 'username' ? errors.array()[0].msg : null,
            errorMessageUserAlreadyExist: errors.array()[0].param === 'email' ? errors.array()[0].msg : null,
            errorMessagePassword: errors.array()[0].param === 'password' ? errors.array()[0].msg : null,
            errorMessagePasswordConfirm: errors.array()[0].param === 'passwordConfirm' ? errors.array()[0].msg : null,

            // save data to render with
            oldInput: { username: username, email: email, password: password, passwordConfirm: passwordConfirm },

            // alter css style
            validationErrors: errors.array(),
        });
    }


    // if (!username || username.length < 4) {
    //     req.flash('error', 'Username must be at least 4 characters long!');
    //     return res.redirect('/signup');
    // }
    // if (password !== passwordConfirm) {
    //     req.flash('error', 'Passwords do not match!');
    //     return res.redirect('/signup');
    // }
    // const userExist = await User.findOne({ email: email });
    // if (userExist) {
    //     req.flash('error', 'This email is used or forbidden!');
    //     return res.redirect('/signup');
    // }
    const user = new User({
        username: username,
        email: email,
        password: password,
        cart: {
            items: [],
            totalPrice: 0.000000000001,
        },
    });
    // Encrypting the password bofore saving to db
    const salt = await bcrypt.genSalt(12); // value of 12 is accepted as highly secure
    user.password = await bcrypt.hash(password, salt);

    user.save();
    console.log(user);
    console.log('Signup successfully!');

    // Sending the email to the client (...continues from the top)
    client.sendMail({
        to: 'twrkhanasparukh@gmail.com', // to should be email, but for testing  to me...
        from: email, // should be reversed
        subject: 'Signup succeeded!',
        text: 'Some text',
        html: '<h1>You successfully signed up!</h1>',
    }, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + JSON.stringify(info));
        }
    });
    return res.redirect('/login');
};

const postLogout = async (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/login');
    });
};

const getReset = async (req, res, next) => {
    let message = req.flash('error');
    let errorMessageNoSuchUser;
    if (message.length > 0) {
        message = message[0];
        if (message === 'No such user!') errorMessageNoSuchUser = message; else errorMessageNoSuchUser = null;
    } else {
        message = null;
    }
    res.render('auth/reset', {
        path: '/reset', // for navigation only -> active route (see header.ejs)
        pageTitle: 'Reset Password',
        errorMessageNoSuchUser: errorMessageNoSuchUser,
    });
};

const postReset = async (req, res, next) => {
    // asynchronous operation -> https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
    crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            req.flash('error', 'No such user!');
            return res.redirect('/reset');
        }
        user.resetToken = token;
        user.resetTokentExpiration = Date.now() + 3600000; // + 3.6mil miliseconds = 1 hour
        await user.save();

        res.redirect('/');
        return client.sendMail({
            to: 'twrkhanasparukh@gmail.com', // to should be email, but for testing  to me...
            from: req.body.email, // should be reversed
            subject: 'Signup succeeded!',
            text: 'Some text',
            html: `
            <p>You requested a password reset!</p>
            <p>Click the <a href="http://localhost:3000/reset/${token}">link</a> below to set a new password.</p>
            `,
        }, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: ' + JSON.stringify(info));
            }
        });
    });
};

const getNewPassword = async (req, res, next) => {
    const token = req.params.token;
    const user = await User.findOne({ resetToken: token, resetTokentExpiration: { $gt: Date.now() } });
    if (user) {
        res.render('auth/new-password-reset', {
            path: '/new-password-reset', // for navigation only -> active route (see header.ejs)
            pageTitle: 'New Password',
            passwordToken: token,
            userId: user._id.toString(),
        });
    }
};

const postNewPassword = async (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    const user = await User.findOne({
        resetToken: passwordToken,
        resetTokentExpiration: { $gt: Date.now() },
        _id: userId,
    });
    if (user) {
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokentExpiration = null;
        await user.save();
        res.redirect('/login');
    }
};

module.exports = {
    getLogin,
    postLogin,
    getSignup,
    postSignup,
    postLogout,
    getReset,
    postReset,
    getNewPassword,
    postNewPassword,
};
