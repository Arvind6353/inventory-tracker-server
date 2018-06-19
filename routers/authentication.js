var express = require('express')

var authRouter = express.Router()
var authController = require('../controllers').authenticationController

authRouter.route('/register')
.all(function(req,res,next) {
  
    next();
})
.post(authController.register)

authRouter.route('/login')
.all(function(req,res,next) {
  
    next();
})
.post(authController.login)



module.exports = authRouter;