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
function validateMovieWithJoi(customer) {
    const schema = Joi.object().keys({
        title: Joi.string().min(5).max(255).required(),
        genre: {
            name: Joi.string().min(5).max(50).required(),
        },
        numberInStock: Joi.number().integer().min(0).max(255).required(),
        dailyRentalRate: Joi.number().integer().min(0).max(255).required(),
    });
    return Joi.validate(customer, schema);
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
module.exports = {
    validateWithJoi,
    validatePhoneWithJoi,
    validateMovieWithJoi,
    validateRentalsWithJoi,
};
