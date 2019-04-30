// MIDDLEWARE
// 2. Logging middleware
function logger(req, res, next) {
    // next is reference to the next middleware function down the pipeline
    console.log('Logging...', req.method, req.url, req.path);
    next(); // as we dont have res.end() -> we need to pass control
    // to the next midleware, so we use next
}

module.exports = logger;
