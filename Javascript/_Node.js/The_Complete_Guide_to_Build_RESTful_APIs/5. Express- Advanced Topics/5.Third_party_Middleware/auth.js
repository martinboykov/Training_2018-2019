// MIDDLEWARE
// 3. Authenticating (after logging)
function auth(req, res, next) {
    // next is reference to the next middleware function down the pipeline
    console.log('Authentication...');
    next(); // as we dont have res.end() -> we need to pass control
    // to the next midleware, so we use next
}
module.exports = auth;
