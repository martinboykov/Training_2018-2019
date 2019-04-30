const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true); // email.unique gives and deprication error (this is workoround: https://github.com/Automattic/mongoose/issues/6890#issuecomment-416218953)
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1024,
  },
});

userSchema.plugin(uniqueValidator);

userSchema.method({
  generateAuthToken: function() {
    // secret must be aded predeployment with config or process.env.CUSTOM_VARIABLE
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, 'secre_this_should_be_longer',
      { expiresIn: '1h' }); // 1 hour duration
    return token;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = { User, userSchema };
