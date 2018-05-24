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
