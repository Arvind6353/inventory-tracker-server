var express = require('express')

var branchProductRouter = express.Router()
var branchProductController = require('../controllers').branchProductController

branchProductRouter.route('/:id/inventories')
.all(function(req,res,next) {
    console.log(' inside branchProduct router with branchProduct id param')
    next();
})
.get(branchProductController.getInventoryByBranchProductId)

branchProductRouter.route('/:id/count')
.all(function(req,res,next) {
    console.log(' inside branchProduct router with branchProduct id param to get count')
    next();
})
.get(branchProductController.getCompletedCountByBranchProductId)


module.exports = branchProductRouter;
