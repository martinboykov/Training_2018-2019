const express = require('express');
const { check, body, query, cookie, param } = require('express-validator/check');

const User = require('../models/user.model').User;


const router = express.Router(); // eslint-disable-line new-cap

const authController = require('../controllers/auth.controller');

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignup);

router.post('/signup',
    [
        // check - checks everything - body, headers, params, etc.
        check('username', 'Username must be at least 4 characters long!')
            .isLength({ min: 4 })
            // sasnitization
            .trim(),
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom(async (value, { req }) => {
                if (value === 'test@test.com') throw new Error('This email is forbidden!');
                const userExist = await User.findOne({ email: value });
                if (userExist) throw new Error('This email is used!');
                return true;
            })
            // sasnitization
            .normalizeEmail(),
        body('password', 'Please enter a valid Password with at least 4 alphanumeric characters.')
            .isLength({ min: 4 }).isAlphanumeric()
            // sasnitization
            .trim(),
        body('passwordConfirm')
            .custom((value, { req }) => {
                console.log(value, req.body.password);
                if (value !== req.body.password) throw new Error('Passwords do not match!');
                return true;
            })
            // sasnitization
            .trim(),
    ],
    authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password-reset', authController.postNewPassword);

module.exports = router;
