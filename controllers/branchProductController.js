var db = require("../db/config");
var logger = require("../utils/logger");

var async = require("async");
var moment = require("moment");


exports.getInventoryByBranchProductId = function(req,res,next) {
    var sql = "\
    SELECT pi.*, m.name , m.code , if(pi.end_day_enter='Y','Evening','Afternoon') as enter_session FROM `product-inventory` pi\
    join \
    member m \
    on m.code = pi.created_by \
    where pi.bp_id = ?\
    and pi.created_date > ? and pi.created_date < ? order by created_date desc";
    
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


exports.getCompletedCountByBranchProductId = function(req,res,next) {
    var sql = "SELECT sum(quantity) as completedCount FROM `maithree-db`.`product-inventory`  where bp_id = ? and created_date >= ? and created_date <= ? ";
    
    console.log(req.params.id,req.query.startDate, req.query.endDate);
    try {
       db.query(sql,[req.params.id, req.query.startDate,req.query.endDate], function(err, result) {
          if (err) {
            logger.error(err);
            return next(err);
          }
          logger.info("Completed Count found for branch-product id "+ req.params.id);
          res.json(result);
        });
    } catch (err) {
        logger.error(err);
        next(err);
    }
}



exports.getPriceForBranchProductId = function(req,res,next) {
    var sql = "SELECT p.price from product p, `branch-product` bp where bp.product_id = p.id and bp.bp_id = ?";

    logger.info(req.params.id);
    try {
       db.query(sql,[req.params.id], function(err, result) {
          if (err) {
            logger.error(err);
            return next(err);
          }
          logger.info("Price Count found for branch-product id "+ req.params.id);
          res.json(result);
        });
    } catch (err) {
        logger.error(err);
        next(err);
    }
}


exports.getDetailsForBranchProductId = function(req,res,next) {

    async.parallel({
        price : function(callback) {
            var sql = "SELECT p.price from product p, `branch-product` bp where bp.product_id = p.id and bp.bp_id = ?";
            
            logger.info(req.params.id);
            try {
               db.query(sql,[req.params.id], function(err, result) {
                  if (err) {
                    logger.error(err);
                    return callback(err);
                  }
                  logger.info("Price Count found for branch-product id "+ req.params.id);
                  callback(null,result);
                });
            } catch (err) {
                logger.error(err);
                callback(err);
            }     
        },
        count : function(callback) {
           
            var sql = "SELECT sum(quantity) as completedCount FROM `maithree-db`.`product-inventory`  where bp_id = ? and created_date >= ? and created_date <= ? ";
            
            logger.info(req.params.id,req.query.startDate, req.query.endDate);
            try {
               db.query(sql,[req.params.id, req.query.startDate,req.query.endDate], function(err, result) {
                  if (err) {
                    logger.error(err);
                    return callback(err);
                  }
                  logger.info("Completed Count found for branch-product id "+ req.params.id);
                  callback(null,result);
                });
            } catch (err) {
                logger.error(err);
                callback(err);
            }

        }
    }, function(err, results){

            if(err){
                logger.error('error occurred ', err)
                return next(err);
            }
            return res.json(results);

    })

}