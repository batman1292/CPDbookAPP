var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
// var images = require()
// var admin = require('./routes/admin');
var connection  = require('express-myconnection');
var mysql = require('mysql');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.set('port', process.env.PORT || 8080);
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))
// app.use('/', routes);
// app.use('/users', users);

app.use(
    connection(mysql,{
        host: 'localhost',
        user: 'root',
        password : '1234',
        port : 3306, //port mysql
        database:'cpd_book_db',
        multipleStatements: true
    },'request')
);//route index, hello world

/// catch 404 and forwarding to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(8080, function() {
    console.log('Express.js is running...');
});

app.get('/', routes.index);
app.get('/bookdetail/:BookID', routes.bookdetail)
// app.get('/administrator', admin.index);

// module.exports   = app;
