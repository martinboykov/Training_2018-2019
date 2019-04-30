const mongoose = require('mongoose');
const Joi = require('joi'); // returns class Joi

const genresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
});

const Genre = mongoose.model('Genre', genresSchema);

function validateDataWithJoi(newGenre) {
    const schema = Joi.object().keys({
        name: Joi.string().required().min(3),
    });
    return Joi.validate(newGenre, schema);
}
module.exports = {
    Genre,
    validateDataWithJoi,
};
