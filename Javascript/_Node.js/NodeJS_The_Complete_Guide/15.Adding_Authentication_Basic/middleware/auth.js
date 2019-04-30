// Checks if authorized before any CRUD operation, requiring auth.

function auth(req, res, next) {
    if (!req.session.isLoggedIn) {
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = auth;
