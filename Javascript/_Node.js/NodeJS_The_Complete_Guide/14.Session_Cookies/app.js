const path = require('path');
const express = require('express');
const app = express(); // express() === http.createServer(...);
const port = 3000;

const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser'); // npm installed

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI = 'mongodb+srv://martinboykov:abcd995511@nodejsmongotest-h6qbj.mongodb.net/test?retryWrites=true';

// storing the session on db
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
});

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const errorController = require('./controllers/error.controller');

const mongoose = require('mongoose');

const User = require('./models/user.model').User;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// app.use(cookieParser());
app.use(session({
    secret: 'my secret',
    resave: false, // session will not be saved on every res, but only on change
    saveUninitialized: false, // session will not be saved on every req, if nothing has changed
    // cookie: { httpOnly: true, secure: false, maxAge: null },
    store: store,
}));

app.use(async (req, res, next) => {
    if (req.session.user) {
        const user = await User.findOne({ _id: req.session.user._id });
        req.user = user; // storing user to every request
    }
    console.log(req.user);
    next();
});

app.use((req, res, next) => {
    // req.isLoggedIn = req.cookies.isLoggedIn; // adding isLoggedIn to every request
    req.isLoggedIn = req.session.isLoggedIn; // adding isLoggedIn to every request
    next();
});


// routes
app.use('/admin', adminRoutes); // if starts with /admin, trigger adminRoutes

app.use(shopRoutes);

app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(async (connection) => {
        // console.log(connection);
        const users = await User.find();
        if (users.length === 0) {
            const user = new User({
                username: 'Martin',
                email: 'test@tets',
                cart: {
                    items: [],
                    totalPrice: 0.000000000001,
                },
            });
            user.save();
            console.log(user);
        }
        console.log('Connected to MongoDB...');
        app.listen(port, () => console.log(`Server listening on port ${port}!`));
    })
    .catch((err) => console.log(err));

// mongoConnect(async () => {
//   const users = await User.getAll();
//   if (users.length === 0) {
//     const user = new User('test', 'test@test');
//     user.save();
//   }
//   app.listen(port, () => console.log(`Server listening on port ${port}!`));
// });

