var db = require("../db/config");
var logger = require("../utils/logger");

var async = require("async");
var moment = require("moment");
var momentTz = require('moment-timezone');

exports.getTargetByBranchId = function(req,res,next) {

    targetByBranchId({id : req.params.id, date : req.query.date}, function(err, result){
        if(err) {
            return res.json(err);
        }
        res.json(result);
    });
}

exports.targetByBranchId = targetByBranchId;

function targetByBranchId(obj, cb) {
    
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
   
    console.log(obj.id,obj.date);
    try {
       db.query(sql,[obj.id, obj.date], function(err, result) {
          if (err) {
            logger.error(err);
            cb(err);
          }
          logger.info("Inventory Data found for branch-product id "+ obj.id);
         cb(null, result);
        });
    } catch (err) {
        logger.error(err);
        cb(err);
    }
}

    
exports.getTargetCountByBranchId = getTargetCountByBranchId;

function getTargetCountByBranchId(obj, cb) {
    
    var sql = "\
    SELECT bp.bp_id as branch_product_id,\
    pt.quantity as target,\
    pt.effective_start_date as start_date, \
    pt.effective_end_date as end_date\
    FROM `branch-product` bp,\
        `product-target` pt\
    WHERE bp.bp_id = pt.branch_product_id\
        and bp.branch_id = ?\
        and pt.effective_end_date >= ? and pt.effective_start_date <= ? \
    ";
    
    console.log(obj.id,obj.startDate, obj.endDate);
    try {
        db.query(sql,[obj.id, obj.endDate, obj.startDate], function(err, result) {
            if (err) {
            logger.error(err);
            cb(err);
            }
            logger.info("Inventory Data found for branch-product id "+ obj.id);
            cb(null, result);
        });
    } catch (err) {
        logger.error(err);
        cb(err);
    }
}
