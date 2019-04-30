const User = require('../models/user.model').User;

const getLogin = async (req, res, next) => {
    console.log(req.session.isLoggedIn);
    // console.log(req.cookies);
    res.render('auth/login', {
        path: '/login', // for navigation only -> active route (see header.ejs)
        pageTitle: 'Login',
        isAuthenticated: req.isLoggedIn,
    });
};
const postLogin = async (req, res, next) => {
    const user = await User.findById('5bf72c96455d733948614215');

    // using session
    // ------------------
    req.session.isLoggedIn = true; // adds connect.sid (session ID) in the Browser with value = s%3AC8rUK9B24dQloAW_rUHTXRrXb-jCsc9s.Bc0r%2FPz3VMYsThPJBoQoCWqz1P6mHLjBaPZ20njmofo
    req.session.user = user;
    await req.session.save();

    // using cookie
    // ------------------
    // res.setHeader('Set-Cookie', 'isLoggedIn=true; HttpOnly'); // (IMPORTANT) cookie cant be accessed via client-side javascript
    // res.setHeader('Set-Cookie', 'isLoggedIn=true; Secure'); // (IMPORTANT) this cookie will only be "SET" if page is served via "HTTPS"
    // res.setHeader('Set-Cookie', 'isLoggedIn=true; Domain=....'); // domain, where cookie to be sent
    // res.setHeader('Set-Cookie', 'isLoggedIn=true; Max-Age=5'); // expires in 5 seconds // so the cookie doesnt go away after broser closing
    // res.setHeader('Set-Cookie', 'isLoggedIn=true; Expires=Tue, 27 Nov 2018 16:35:30 GMT'); // input is http date format (GMT = -2 Sofia) // so the cookie doesnt go away after broser closing
    res.redirect('/');
};
const postLogout = async (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/login');
    });
};

module.exports = {
    getLogin,
    postLogin,
    postLogout,
};
