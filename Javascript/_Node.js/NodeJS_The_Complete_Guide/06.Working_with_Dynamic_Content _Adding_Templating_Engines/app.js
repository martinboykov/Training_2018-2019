const path = require('path');
const rootDir = require('./util/path');
const express = require('express');
const app = express(); // exoress() === http.createServer(routes);
const bodyParser = require('body-parser');
const port = 3000;
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

// routes
// if route starts with /admin, trigger adminRoutes
app.use('/admin', adminRoutes.router);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
