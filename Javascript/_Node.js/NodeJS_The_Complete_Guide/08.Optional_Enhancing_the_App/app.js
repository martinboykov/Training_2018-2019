const path = require('path');
const express = require('express');
const app = express(); // express() === http.createServer(...);
const bodyParser = require('body-parser');
const port = 3000;
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error.controller');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

// routes
app.use('/admin', adminRoutes); // if starts with /admin, trigger adminRoutes

app.use(shopRoutes);

app.use(errorController.get404);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
