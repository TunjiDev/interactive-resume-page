const path = require('path');
const express = require('express');

const resumeRouter = require('./src/routes/resumeRoutes');

//Start express app
const app = express();

//GLOBAL MIDDLEWARES
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
//Serving static files
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use(express.urlencoded({extended: true, limit: '100kb'}));

//ROUTES
app.use('/', resumeRouter);

app.all('*', (req, res, next) => {
    res.render('404');
});

module.exports = app;