const express = require('express');
const hbs = require('hbs');
const fs = require('fs'); // to print the message on the screen
const app = express();

hbs.registerPartials(__dirname + '/views/partials');// to add the partials
app.set('view engine', 'hbs');


// ADD BASIC MIDDLEWARE
// ONE START
// we can use it to determine :
// - make a database request to see if the user is authenticated
// - to respond to a request (same as app.get)
app.use((req, res, next) => { // with add.use - we register new middleware
    // next is used to tell express
    // when the specific middleware function is done
    // next is like generator yeld
    // (if we do smth asynchroneus it will not move until the response is )
    const now = new Date().toString();
    // console.log(`${now}: ${req.method} ${req.url}`); заместено с ->
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log); // to see when someone has made request to specific middleware
    // we are loging message on the screen:
    // the req.method === GET/POST.. и
    // url of the rout === / or /about

    fs.appendFile('server.log', log + '\n', (err) => {
        // we are adding new server.log file (if it doesnt exists),
        // we are adding to the file -> log + '\n',
        // callback fn for errors
        // look at server.log
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});
// ONE END

// TWO START
// check if we are in the maintanence mode
// app.use((req, res, next) => { // rewrite app.get
//     res.render('maintenance.hbs');
//     // next(); //без next не стига до static
// });
// TWO END


// THREE START - we render it at the end so the static files are executed
// only if there is no mainenece
// if we are not in maintanence mode wiil execute:
app.use(express.static(__dirname + '/public'));
// THREE END


hbs.registerHelper('getCurrentYear', () => { // add it in footer.hbs
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase(); // addet in home.hbs using screamit (text)
});

// static files:
// ONE
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
    });
});

// TWO
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});
// THREE
// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request',
    });
});

app.listen(3001, () => {
    console.log('Server is up on port 3000');
});
