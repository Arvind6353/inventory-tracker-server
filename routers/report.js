var express = require('express')

var reportRouter = express.Router();
var reportController = require('../controllers').reportController;

reportRouter.route('/inventories')
.all(function(req,res,next) {
    console.log(' inside inventory router call')
    next();
}).get(reportController.getInventriesDetail);
reportRouter.route('/inventories/summary')
.all(function(req,res,next) {
    console.log(' inside inventory router call')
    next();
}).get(reportController.getInventriesCount);

reportRouter.route('/inventories/:branchId/summary')
.all(function(req,res,next) {
    console.log(' inside inventory router call for branchId')
    next();
}).get(reportController.getInventriesCountByBranchId);


module.exports = reportRouter;