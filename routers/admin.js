var express = require('express')

var adminRouter = express.Router()
var adminController = require('../controllers').adminController

adminRouter.route('/get-target-data')
.all(function(req,res,next) {
    next();
})
.get(adminController.getBranchProductDetailsForTarget)


adminRouter.route('/')
.all(function(req,res,next) {
    next();
})
.post(adminController.createOrReplaceTargets)


//getBranchProductDetailsForTarget

module.exports = adminRouter;