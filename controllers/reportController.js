var logger = require("../utils/logger");
var reportOpertaion = require("../db/reportOperations");
var moment = require("moment");

exports.getInventriesDetail = function(req,res,next) {
    var value = {
        startDate: req.query.startDate ? getFormattedStartDate(req.query.startDate):null,
        endDate: req.query.endDate ? getFormattedEndDate(req.query.endDate):null
    }
    reportOpertaion.getAllInventries(value, function(err, result){
        if (err) {
            logger.error(err);
            return next(err);
          }
          res.json(result);
    });
}

exports.getInventriesCount = function(req,res,next) {
    var value = {
        startDate: req.query.startDate ? getFormattedStartDate(req.query.startDate):null,
        endDate: req.query.endDate ? getFormattedEndDate(req.query.endDate):null
    }
    reportOpertaion.getAllInventriesCount(value, function(err, result){
        if (err) {
            logger.error(err);
            return next(err);
          }
          res.json(result);
    });
}

function getFormattedStartDate(date){
   return moment(new Date(date)).startOf("day").format("YYYY-MM-DD HH:mm:ss");
}

function getFormattedEndDate(date){
    return moment(new Date(date)).endOf("day").format("YYYY-MM-DD HH:mm:ss");
 }