const mongoose = require('mongoose');
const Joi = require('joi'); // returns class Joi


const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
});
const Customer = mongoose.model('Customer', customerSchema);

function validateWithJoi(newCustomer) {
    const schema = Joi.object().keys({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
    });
    return Joi.validate(newCustomer, schema);
}
function validatePhoneWithJoi(customer) {
    const schema = Joi.object().keys({
        phone: Joi.string().min(6),
    });
    return Joi.validate(customer, schema);
}

module.exports = {
    Customer,
    validateWithJoi,
    validatePhoneWithJoi,
};
