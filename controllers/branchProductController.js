var db = require("../db/config");
var logger = require("../utils/logger");

var async = require("async");
var moment = require("moment");


exports.getInventoryByBranchProductId = function(req,res,next) {
    var sql = "\
    SELECT pi.*, m.name FROM `product-inventory` pi\
    join \
    member m \
    on m.code = pi.created_by \
    where pi.bp_id = ?\
    and pi.created_date > ? and pi.created_date < ? ";
    
    console.log(req.params.id,req.query.startDate, req.query.endDate);
    try {
       db.query(sql,[req.params.id, req.query.startDate,req.query.endDate], function(err, result) {
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

