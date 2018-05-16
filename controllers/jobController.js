var db = require("../db/config");
var logger = require("../utils/logger");

exports.createJob = function(req,res,next) {
    var sql = "INSERT into `PRODUCT-INVENTORY` (bp_id,quantity,end_day_enter,created_date, created_by) VALUES (?)"; 
    var values = [
       req.body.bp_id,
       req.body.quantity,
       req.body.isEndDay,
       new Date(),
       req.body.member_code
      ];
    try {
       db.query(sql,[values], function(err, result) {
          if (err) {
            logger.error(err);
            return next(err);
          }
          logger.info("Number of rows inserted " + result.affectedRows);
          res.json(result);
        });
    } catch (err) {
        logger.error(err);
        next(err);
    }
}

exports.getJobsById = function(req,res,next) {
    var sql = "SELECT * from `PRODUCT-INVENTORY` where BP_ID = ?";
    try {
       db.query(sql,[req.params.id], function(err, result) {
          if (err) {
            logger.error(err);
            return next(err);
          }
          logger.info("Job Data found for branch-product id "+ req.params.id);
          res.json(result);
        });
    } catch (err) {
        logger.error(err);
        next(err);
    }
}