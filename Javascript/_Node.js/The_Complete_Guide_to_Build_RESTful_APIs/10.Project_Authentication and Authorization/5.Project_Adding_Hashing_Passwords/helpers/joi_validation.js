const Joi = require('joi'); // returns class Joi
function validateWithJoi(newData) {
    const schema = Joi.object().keys({
        name: Joi.string().min(5).max(50).required(),
    });
    return Joi.validate(newData, schema);
}
function validatePhoneWithJoi(customer) {
    const schema = Joi.object().keys({
        phone: Joi.string().min(6),
    });
    return Joi.validate(customer, schema);
}
function validateMovieWithJoi(movie) {
    const schema = Joi.object().keys({
        title: Joi.string().min(5).max(255).required(),
        genre: {
            name: Joi.string().min(5).max(50).required(),
        },
        numberInStock: Joi.number().integer().min(0).max(255).required(),
        dailyRentalRate: Joi.number().integer().min(0).max(255).required(),
    });
    return Joi.validate(movie, schema);
}
function validateRentalsWithJoi(rentals) {
    const schema = Joi.object().keys({
        customer: {
            _id: Joi.string().required(),
        },
        movies: Joi.array().required(),
    });
    return Joi.validate(rentals, schema);
}
function validateUserWithJoi(user) {
    // we can use joi-password-complexity package as well
    // https://www.npmjs.com/package/joi-password-complexity
    const passwordRegex = /^[a-zA-Z0-9]{5,1024}$/;
    const schema = Joi.object().keys({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().regex(passwordRegex).required(),
    });
    return Joi.validate(user, schema);
}
module.exports = {
    validateWithJoi,
    validatePhoneWithJoi,
    validateMovieWithJoi,
    validateRentalsWithJoi,
    validateUserWithJoi,
};
