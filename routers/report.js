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

module.exports = reportRouter;