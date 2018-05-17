var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');
var config = require('config');
var helmet = require('helmet')
var cors = require("cors");
var logger = require('./utils/logger');

var db = require('./db/config');


//configs

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


var allowCrossDomain = function(req, res, next) {
  //res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  next();
}


app.use(cors());
app.options('*', cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// security 
app.use(helmet());

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc:["'self'","'unsafe-inline'"],
    styleSrc: ["'unsafe-inline'",  "'self'", "maxcdn.bootstrapcdn.com","http://code.jquery.com","https://www.paypalobjects.com"],
    imgSrc: ["data:","'self'", "maxcdn.bootstrapcdn.com","http://code.jquery.com","https://www.paypalobjects.com"]
  }
}))

app.use(function (req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
})
// end config

app.get('/favicon.ico', function(req, res) {
  res.status(204);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req,res,next){
  res.render("index");
})

const router = require('./routers/index')

app.use('/api/v1/branches', router.branchRouter)
app.use('/api/v1/inventory', router.inventoryRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found ' + req.path);
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  //logger.error(err)
    res.status(500).render('error');
});

process.on('uncaughtException', function(err) {
  logger.error('Caught exception: ' + err);
  process.exit();
});

module.exports = app;