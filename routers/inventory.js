var express = require('express')

var inventoryRouter = express.Router()
var inventoryController = require('../controllers').inventoryController

inventoryRouter.route('/')
.all(function(req,res,next) {
    console.log(' inside inventory router call')
    next();
})
.post(inventoryController.createInventory)

inventoryRouter.route('/:id')
.all(function(req,res,next) {
    console.log(' inside inventory router with inventory id param')
    next();
})
.get(inventoryController.getInventoryByBranchId)

module.exports = inventoryRouter;