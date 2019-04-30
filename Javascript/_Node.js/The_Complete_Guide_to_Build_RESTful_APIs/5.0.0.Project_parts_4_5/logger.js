function logging(req, res, next) {
    console.log(`Logging ${req.method} ${req.url}`);
    next();
}
module.exports = logging;
