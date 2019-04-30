// handles the try/catch block for every route =>
// so the code is more clean

// Used for demonstration in /routes/users.js

module.exports = function(handler) {
    return async function(req, res, next) {
        try {
            await handler(req, res);
        } catch (ex) {
            next(ex);
        }
    };
};
