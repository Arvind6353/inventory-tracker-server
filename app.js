var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');
var config = require('config');
var helmet = require('helmet')
var cors = require("cors");
var jwt = require('jsonwebtoken');
var session = require('express-session');

var logger = require('./utils/logger');

var db = require('./db/config');

var secrectjson = require('./db/secret.json')
var cookieSession = require('cookie-session')
var randomstring = require("randomstring");


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
    styleSrc: ["'unsafe-inline'",  "'self'", "maxcdn.bootstrapcdn.com","http://code.jquery.com"],
    imgSrc: ["data:","'self'", "maxcdn.bootstrapcdn.com","http://code.jquery.com"]
  }
}))

// end config

app.get('/favicon.ico', function(req, res) {
  res.status(204);
});

app.use("/server",express.static(path.join(__dirname, 'public'), {
  maxAge: 86400000 * 300
 }))

app.get("/", function(req,res,next){
  res.render("index");
})

const router = require('./routers/index')




var authMiddleware = function(req,res,next) {
  jwt.verify(req.headers.auth, secrectjson.secret, function(err, decoded) {
    if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate.' });
    next();
  });
}

var adminMiddleWare =  function(req,res,next) {
  console.log("inside admin middleware");
  var decoded = jwt.decode(req.headers.auth);
  console.log(JSON.stringify(decoded));
  if (decoded.isAdmin != 'Y') return res.status(401).send({ auth: false, message: 'Failed to authenticate.' });
  next();
}

app.use(session({
  secret: randomstring.generate(), 
  resave: false, 
  saveUninitialized: true,
  cookie: { maxAge: 10 * 60 * 1000 }
}))

app.use('/server/api/v1/branches', authMiddleware, router.branchRouter)

app.use('/server/api/v1/inventories', authMiddleware ,router.inventoryRouter);
app.use('/server/api/v1/reports', authMiddleware ,router.reportRouter);
app.use('/server/api/v1/branchProduct', authMiddleware ,router.branchProductRouter)

app.use('/server/api/v1/target',authMiddleware, router.targetRouter)
app.use('/server/api/v1/admin',authMiddleware, adminMiddleWare, router.adminRouter)

app.use('/server/api/v1/auth', router.authRouter)


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
   logger.error(err)
   res.status(500).render('error');
});



process.on('uncaughtException', function(err) {
  logger.error('Caught exception: ' + err);
  process.exit();
});

module.exports = app;