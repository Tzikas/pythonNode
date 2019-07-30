var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require('body-parser')
const mongoose     = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


mongoose
  .connect('mongodb+srv://niko:Canela8!@cluster0-k13bi.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// Function callName() is executed whenever
// the URL is of the form localhost:3000/name
//app.get('/name', callName);

//function callName(req, res) {

    // console.log('in here')
    // // Use child_process.spawn method from
    // // child_process module and assign it
    // // to variable spawn
    // var spawn = require("child_process").spawn;

    // // Parameters passed in spawn -
    // // 1. type_of_script
    // // 2. List containing Path of the script
    // //    and arguments for the script

    // // E.g.: http://localhost:3000/name?firstname=Mike&lastname=Will
    // // So, first name = Mike and last name = Will
    // var process = spawn('python',["./hello.py",
    //                         req.query.firstname,
    //                         req.query.lastname] );

    // // Takes stdout data from script which executed
    // // with arguments and send this data to res object
    // process.stdout.on('data', function(data) {
    //     res.send(data.toString());
    // } )
//}


module.exports = app;
