var express = require('express')

var targetRouter = express.Router()
var targetController = require('../controllers').targetController

targetRouter.route('/branch/:id')
.all(function(req,res,next) {
    console.log(' inside target router with target id param');
    next();
})
.get(targetController.getTargetByBranchId)


targetRouter.route('/get-product-list')
.all(function(req,res,next) {
    console.log(' inside get-product-list');
    next();
})
.get(targetController.getProducts)

targetRouter.route('/get-target-data')
.all(function(req,res,next) {
    console.log(' inside getBranchProductDetailsForTarget');
    next();
})
.get(targetController.getBranchProductDetailsForTarget)


targetRouter.route('/')
.all(function(req,res,next) {
    console.log(' inside createOrReplaceTargets');
    next();
})
.post(targetController.createOrReplaceTargets)


//getBranchProductDetailsForTarget

module.exports = targetRouter;