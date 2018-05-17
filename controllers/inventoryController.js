var db = require("../db/config");
var logger = require("../utils/logger");

var async = require("async");

exports.createInventory = function(req,res,next) {

    var items = req.body;
    async.eachSeries(items,function(itm, callback){
        var sql = "INSERT into `PRODUCT-INVENTORY` (bp_id,quantity,end_day_enter,created_date, created_by) VALUES (?)"; 
        var values = [
           itm.bp_id,
           itm.quantity,
           itm.isEndDay,
           new Date(),
           itm.member_code
          ];
        try {
           db.query(sql,[values], function(err, result) {
              if (err) {
                logger.error(err);
                callback(err);
              }
              logger.info("Number of rows inserted " + result.affectedRows);
              callback(null,result.affectedRows);
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

exports.getInventoryById = function(req,res,next) {
    var sql = "SELECT * from `PRODUCT-INVENTORY` where BP_ID = ?";
    try {
       db.query(sql,[req.params.id], function(err, result) {
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