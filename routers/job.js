var express = require('express')

var jobRouter = express.Router()
var jobController = require('../controllers').jobController

jobRouter.route('/')
.all(function(req,res,next) {
    console.log(' inside job router call')
    next();
})
.post(jobController.createJob)

jobRouter.route('/:id')
.all(function(req,res,next) {
    console.log(' inside job router with job id param')
    next();
})
.get(jobController.getJobsById)

module.exports = jobRouter;