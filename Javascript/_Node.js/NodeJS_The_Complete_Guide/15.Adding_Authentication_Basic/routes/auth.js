const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

const authController = require('../controllers/auth.controller');

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignup);

router.post('/signup', authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;
