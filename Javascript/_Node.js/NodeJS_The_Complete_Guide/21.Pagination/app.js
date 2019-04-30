const express = require('express');
const path = require('path');
const port = 3000;
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser'); // npm installed

const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI = 'mongodb+srv://martinboykov:abcd995511@nodejsmongotest-h6qbj.mongodb.net/test?retryWrites=true';

const csrf = require('csurf');
const flash = require('connect-flash');

// File Upload
const multer = require('multer');
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toJSON().slice(0, 23).replace(/[-:./]/g, '_') + '_' + file.originalname);
    },
});
const upload = multer({ storage: fileStorage });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/png' ||
//         file.mimetype === 'image/jpg' ||
//         file.mimetype === 'image/jpeg'
//     ) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };
// const upload = multer({ storage: fileStorage, fileFilter: fileFilter });


const errorController = require('./controllers/error.controller');
const User = require('./models/user.model').User;

const app = express(); // express() === http.createServer(...);
// storing the session on db
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
});
const csrfProtection = csrf(); // default settings

// setting Email sending via Sendgrid/nodemailer
// look at ./controllers/auth.controller.js


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/img', express.static(path.join(__dirname, 'public/img')));
app.use(session({
    secret: 'my secret', // !!!! SECRET MUST BE IN CONFIG ENV_VARIABLES
    resave: false, // session will not be saved on every res, but only on change
    saveUninitialized: false, // session will not be saved on every req, if nothing has changed
    // cookie: { httpOnly: true, secure: false, maxAge: null },
    store: store,
}));
app.use(upload.single('image')); // 'image' is the same name as the name of input field name="image" in edit(add)-product.ejs

// for every post request "csrfProtection" looks for the existence of csrf token in the request body
app.use(csrfProtection); // after the session was created
app.use(flash());
// adding isAuthenticated middleware using res.locals (isAuthenticated is available on every view)
// adding crsf middleware (video - 255) using res.locals (csrfToken is available on every view)
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn; // adding isLoggedIn to every request
    // console.log(req.session.isLoggedIn);
    res.locals.csrfToken = req.csrfToken();
    // console.log(res.locals.csrfToken);
    next();
});

app.use(async (req, res, next) => {
    try {
        if (!req.session.user) {
            return next();
        }
        const user = await User.findOne({ _id: req.session.user._id });
        req.user = user; // storing user to every request, so we can use User model everywhere
        // console.log(req.user);
        return next();
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error); // must use next() if we use assync code (then(()=>). catch(()=>))
        // next(new Error(error));
    }
    //    throw new Error('dummy'); // in sync code can trow errors
});

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

// routes
app.use('/admin', adminRoutes); // if starts with /admin, trigger adminRoutes
app.use(shopRoutes);
app.use(authRoutes);
// app.get('/500', errorController.get500);
app.use(errorController.get404);

// express error handling function (error, ...) only here we have 4 arguments
// app.use((error, req, res, next) => {
//     res.status(error.httpStatusCode).render('500', {
//         pageTitle: 'Error',
//         path: '/500',
//         isAuthenticated: req.session.isLoggedIn,
//     });
//     // res.redirect('/500'); // can lead to infinite loops
// });

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(async (connection) => {
        // console.log(connection);
        console.log('Connected to MongoDB...');
        app.listen(port, () => console.log(`Server listening on port ${port}!`));
    })
    .catch((err) => console.log(err));

