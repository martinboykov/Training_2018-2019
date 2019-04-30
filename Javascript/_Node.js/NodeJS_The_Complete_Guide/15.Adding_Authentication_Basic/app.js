const path = require('path');
const express = require('express');
const port = 3000;

const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser'); // npm installed

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI = 'mongodb+srv://martinboykov:abcd995511@nodejsmongotest-h6qbj.mongodb.net/test?retryWrites=true';
const csrf = require('csurf');
const flash = require('connect-flash');

const app = express(); // express() === http.createServer(...);

// storing the session on db
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
});
const csrfProtection = csrf(); // default settings

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const errorController = require('./controllers/error.controller');

const mongoose = require('mongoose');

const User = require('./models/user.model').User;

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

// for every post request "csrfProtection" looks for the existence of csrf token in the request body
app.use(csrfProtection); // after the session was created

app.use(flash());

app.use(async (req, res, next) => {
    if (req.session.user) {
        const user = await User.findOne({ _id: req.session.user._id });
        req.user = user; // storing user to every request, so we can use User model everywhere
    }
    // console.log(req.user);
    next();
});

// adding isAuthenticated middleware using res.locals (isAuthenticated is available on every view)
// adding crsf middleware using res.locals (csrfToken is available on every view)
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    res.locals.isAuthenticated = req.session.isLoggedIn; // adding isLoggedIn to every request
    // console.log(req.session.isLoggedIn);
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
        console.log('Connected to MongoDB...');
        app.listen(port, () => console.log(`Server listening on port ${port}!`));
    })
    .catch((err) => console.log(err));

