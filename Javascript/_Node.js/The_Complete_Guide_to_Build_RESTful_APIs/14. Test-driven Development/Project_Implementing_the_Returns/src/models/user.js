const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Information expert principle (OOP)
// JSON WEB TOKEN (JWT)
// --------------
// When user login to the server, the server generates this JWT
// and give it to the client so that next time
// he tries to perform task that requires authorization
// wont have to login aggain (Single Sign On)
// For webapplication - can use local storage to store the JWT
userSchema.method({
  generateAuthToken: function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin },
        config.get('jwtPrivateKey'));
    return token;
  },
});
// will generate token and send it to the client
// eslint-disable-next-line max-len
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhlYThhZTgxMDMyODQyNzhhNzFlMzYiLCJpYXQiOjE1MzYwNzczNjd9.rYGd8xk338a3jAdgf_2Z-XzpyC9NX6qB94JGmzAhTuo
// IF you copy/past the token in jwt.io
// eslint-disable-next-line max-len
// youll get the payload json obj {"_id": "5b8ea8ae8103284278a71e36",  "iat": 1536077367 }
// "iat" is a timestamp that we can use to get the time of
// creation of the token


const User = mongoose.model('User', userSchema);


module.exports = { User, userSchema };
