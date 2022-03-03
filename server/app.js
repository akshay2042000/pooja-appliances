var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//IMPORT ROUTES 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var productsRouter = require('./routes/product');
var stateRouter = require('./routes/state');
var categoryRouter = require('./routes/category');
var companyRouter = require('./routes/company');
var hsnCodeRouter = require('./routes/hsn');
var productRouter = require('./routes/product');
var orderRouter = require('./routes/order');
var authRouter = require('./routes/auth');
var billRouter = require('./routes/bill');
var pdfRouter = require('./routes/invoicePdf');



var app = express();

// redirect to https

app.all('*', (req, res, next) => {
    if (req.protocol == 'http') {
        res.redirect(307, 'https://' + req.hostname + ':' + app.get('httpsPort') + req.url);
    }
    next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// ROUTES 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/states', stateRouter);
app.use('/categories', categoryRouter);
app.use('/companies', companyRouter);
app.use('/hsnCodes', hsnCodeRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/auth', authRouter);
app.use('/bills', billRouter);
app.use('/invoicePdf', pdfRouter);



// DB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.m2lsr.mongodb.net/poojaAppliancesDB?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log(err);
    })



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
