var logger = require("../utils/logger");
var reportOpertaion = require("../db/reportOperations");
var moment = require("moment");
var async = require("async");
var getTargetCountByBranchId = require("../controllers/targetController").getTargetCountByBranchId;

var _ = require("lodash");

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
        endDate: req.query.endDate ? getFormattedEndDate(req.query.endDate):null,
        branchId : req.query.branchId ? req.query.branchId : null
    }
    reportOpertaion.getAllInventriesCount(value, function(err, result){
        if (err) {
            logger.error(err);
            return next(err);
          }
          res.json(result);
    });
}


exports.getInventriesCountByBranchId =  function(req,res,next) {
    var summaryArr = [];
    var monthArray = enumerateDaysBetweenDates(moment(new Date()).startOf("year"), moment(new Date()).endOf("year"))
    async.eachSeries(monthArray, function(month , cb) {
        var value = {
            startDate: getFormattedStartDate(month),
            endDate: getFormattedEndDate(moment(month).endOf("month")),
            branchId : req.params.branchId ? req.params.branchId : null
        }
        var inventoryData = {};

        async.parallel({
            inventory : function(cbl) {
                reportOpertaion.getAllInventriesCountByBranchId(value, function(err, result) {
                    if (err) {
                        logger.error(err);
                    }
                    inventoryData = {
                        date : month,
                        data : result
                    };
                    cbl(null, []);
                })
            },
            target : function(cbl) {
                getTargetCountByBranchId({id : req.params.branchId, startDate : getFormattedStartMonth(month), 
                endDate: getFormattedEndDate(month)}, function(err, result){
                    if(err) {
                        logger.error(err);
                    }
                    inventoryData.target = result;
                    cbl(null,[]);
                });
            }   

        }, function(err, rslt){
            summaryArr.push(inventoryData);
            cb(null, []);
        })    

     }, function(err, result) {
         if(err) {
            logger.error(err);
         }
         res.json(doSomeProcessing(summaryArr.slice(0)));
     });
}

function getFormattedStartDate(date){
   return moment(new Date(date)).startOf("day").format("YYYY-MM-DD HH:mm:ss");
}

function getFormattedEndDate(date){
    return moment(new Date(date)).endOf("day").format("YYYY-MM-DD HH:mm:ss");
 }

 function getFormattedStartMonth(date){
    return moment(new Date(date)).startOf("month").format("YYYY-MM-DD HH:mm:ss");
 }
 
 function getFormattedEndMonth(date){
     return moment(new Date(date)).endOf("month").format("YYYY-MM-DD HH:mm:ss");
  }
 

 // Returns an array of dates between the two dates
function enumerateDaysBetweenDates(startDate, endDate) {
    startDate = moment(startDate);
    endDate = moment(endDate);

    var now = startDate, dates = [];

    while (now.isBefore(endDate) || now.isSame(endDate)) {
        dates.push(now.format('YYYY-MM-DD'));
        now.add(1, 'months');
    }
    return dates;
};

function doSomeProcessing(data) {
    try {
        var out = [];
        data.map(function(datum, i) {
            var obj = {
                date : datum.date,
                item : []
            };

            var dataArr = datum.data;
            var targetArr = datum.target;
            for(var i = 0; i< dataArr.length; i++) {
                var bp_id = dataArr[i].branch_product_id;
                var product_name = dataArr[i].product_name;
                var quantity = dataArr[i].total_quantity;
                var target = _.find(targetArr, {branch_product_id : bp_id});
                var targetVal = 0;
                if(target) {
                    targetVal = target.target;
                };
                obj.item.push({
                    product_name,
                    target: targetVal,
                    quantity
                })
            }
            out.push(obj);
        });

        return out;
    } catch(error) {
        logger.error(err);
        return {};
    }
}