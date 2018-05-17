var db = require("../db/config");
var logger = require("../utils/logger");

var async = require("async");
var moment = require("moment");

exports.createInventory = function(req,res,next) {

    var items = req.body;
    async.eachSeries(items,function(itm, callback){

        var checkForDuplicateSql = "Select * from `PRODUCT-INVENTORY` where bp_id = ? and created_date > ? and created_date < ?";

        var values = [
            itm.bp_id,
            moment(new Date()).startOf("day").format("YYYY-MM-DD HH:mm:ss"),
            moment(new Date()).endOf("day").format("YYYY-MM-DD HH:mm:ss")
           ];
         
        try {
            db.query(checkForDuplicateSql, values , function(err, result) {
                if (err) {
                    logger.error(err);
                    callback(err);
                }
                if(result.length > 0 ) {
                 return  callback(null,'');
                } else {
                    var sql = "INSERT into `PRODUCT-INVENTORY` (bp_id,quantity,end_day_enter,created_date, created_by) VALUES (?)"; 
                    var values = [
                    itm.bp_id,
                    itm.quantity,
                    itm.isEndDay,
                    new Date(),
                    itm.member_code
                    ];
                
                    db.query(sql,[values], function(err, result) {
                        if (err) {
                            logger.error(err);
                            callback(err);
                        }
                        logger.info("Number of rows inserted " + result.affectedRows);
                        callback(null,result.affectedRows);
                        });
                }
            });
        } catch (err) {
                logger.error(err);
                callback(err);
        }

    }, function(err, rslts){
        if(err){
            return res.json(err);
        }
        res.json({status : "success"})
    })
    
}

exports.getInventoryByBranchId = function(req,res,next) {
    var sql = "\
    SELECT bp.bp_id as branch_product_id,\
    p.name as product_name,\
    p.description as product_description,\
    p.img as img,\
    sum(pi.quantity) as product_quantity\
    FROM `branch-product` bp,\
        `product-inventory` pi,\
        product p\
    WHERE p.id = bp.product_id\
       and bp.bp_id = pi.bp_id\
       and bp.branch_id = ?\
       and pi.created_date > ? \
       and pi.created_date < ? \
    group by bp.bp_id ,\
    p.name ,\
    p.description";
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