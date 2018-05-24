var express = require('express')

var targetRouter = express.Router()
var targetController = require('../controllers').targetController

targetRouter.route('/branch/:id')
.all(function(req,res,next) {
    console.log(' inside target router with target id param');
    next();
})
.get(targetController.getTargetByBranchId)

module.exports = targetRouter;