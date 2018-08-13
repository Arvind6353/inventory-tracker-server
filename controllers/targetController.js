var db = require("../db/config");
var logger = require("../utils/logger");

var async = require("async");
var moment = require("moment");
var momentTz = require('moment-timezone');

exports.getTargetByBranchId = function(req,res,next) {
    var sql = "\
    SELECT bp.bp_id as branch_product_id,\
    pt.quantity as target,\
    pt.effective_start_date as start_date, \
    pt.effective_end_date as end_date\
    FROM `branch-product` bp,\
        `product-target` pt\
    WHERE bp.bp_id = pt.branch_product_id\
       and bp.branch_id = ?\
       and pt.effective_end_date > ? \
   ";
    console.log(req.params.id,req.query.date);
    try {
       db.query(sql,[req.params.id, req.query.date], function(err, result) {
          if (err) {
            logger.error(err);
            return next(err);
          }
          logger.info("Inventory Data found for branch-product id "+ req.params.id);
          res.json(result);
        });
    } catch (err) {
        logger.error(err);
        next(err);
    }
}


exports.getProducts = function(req,res,next) {
    var sql = "SELECT * FROM maithree.product";
  
    try {
       db.query(sql,[req.params.id, req.query.date], function(err, result) {
          if (err) {
            logger.error(err);
            return next(err);
          }
          logger.info("List of all Products");
          res.json(result);
        });
    } catch (err) {
        logger.error(err);
        next(err);
    }
    
} 


exports.getBranchProductDetailsForTarget = function(req, res, next){

  async.waterfall([
    function (callback) {
        var sql = "select a.id, b.branch_id, b.bp_id, 'target' as TempField from maithree.`product` a, maithree.`branch-product` b where a.id = b.product_id order by a.id;"  
          executeQuery(sql, function(data){
          const result = groupBy(data, (c) => c.id);
          callback(null, result);
          })
         
    },
    function (bdata, callback) {
          var sql = "SELECT * FROM maithree.product";
          executeQuery(sql, function(data){
            let branchData = data
            for(let i in branchData) {
              let pId = branchData[i].id;
              let productUsedInBranches = bdata[pId];
              if(productUsedInBranches == undefined){
                 branchData[i]['targetData'] = [];
               }else {
                 branchData[i]['targetData'] = productUsedInBranches;
                 
               }
             
            }
            callback(null, branchData);
          })
         }
], function (err, result) {
     res.json(result);
});
}


function executeQuery(sqlQuery, cb) {
  try {
      console.log(sqlQuery)
       db.query(sqlQuery, function(err, result) {
          if (err) {
            logger.error(err);
            cb(err);
          }
          logger.info("Finding results");
         cb(result);
        });
    } catch (err) {
       cb(err);
    }
}

function groupBy(xs, f) {
  return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}