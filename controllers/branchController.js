var db = require("../db/config");
var logger = require("../utils/logger");

var async = require("async");
exports.getBranchList = function(req,res,next) {
    var sql = "SELECT * from branch ";
    try {
       db.query(sql, function(err, result) {
          if (err) {
            logger.error(err);
            return next(err);
          }
          logger.info("Number of branches " + result.length);
          res.json(result);
        });
    } catch (err) {
        logger.error(err);
        next(err);
    }
}


exports.getBranchById = function(req,res,next) {
    var sql = "SELECT * from branch where ID = ?";
    try {
       db.query(sql,[req.params.id], function(err, result) {
          if (err) {
            logger.error(err);
            return next(err);
          }
          logger.info("Branch Data found ");
          res.json(result);
        });
    } catch (err) {
        logger.error(err);
        next(err);
    }
}



exports.getTeachersByBranchId = function(req,res,next) {
    var sql = "SELECT * from member where branch_id = ?";
    try {
       db.query(sql,[req.params.id], function(err, result) {
          if (err) {
            logger.error(err);
            return next(err);
          }
          logger.info("Teacher Data found for the branch id "+ req.params.id);
          res.json(result);
        });
    } catch (err) {
        logger.error(err);
        next(err);
    }
}

exports.getProductsByBranchId = function(req,res,next) {
    var sql = "SELECT * FROM `branch-product` bp,`product` p where p.ID = bp.PRODUCT_ID and BRANCH_ID = ? ";
    try {
       db.query(sql,[req.params.id], function(err, result) {
          if (err) {
            logger.error(err);
            return next(err);
          }
          logger.info("Products Data found for the branch id "+ req.params.id);

          var rslt = result.map((rs,i)=>{
              return {
                id : rs.bp_id,
                name : rs.name,
                description : rs.description,
                img: rs.image
              }
            })

          res.json(rslt);
        });
    } catch (err) {
        logger.error(err);
        next(err);
    }
}

exports.createProductsByBranchId = function(req,res,next) {
    var branchId = req.params.id;
    var productNames = req.body.product_names;
    logger.info("product names "+ productNames);
    var sql = "SELECT id FROM product where name in (?) ";
    try {
    db.query(sql,[productNames], function(err, result) {
          if (err) {
            logger.error(err);
            return next(err);
          }
          logger.info("result : "+ result);

          async.each(result, function(rs, callback){
              
            var sql = "INSERT into `branch-product` (branch_id, product_id, created_date) values (?)"; 
            var values = [
                req.params.id,
                rs.id,
                new Date()
            ];
            console.log('before insert');
            console.log(values);
            db.query(sql,[values], function(err, insRes) {
                if (err) {
                    logger.error(err);
                    callback(err);
                }
                logger.info("Number of rows inserted " + insRes.affectedRows);
                callback(null,insRes.affectedRows);
                });

          })
          res.json({});
        });
    } catch (err) {
        logger.error(err);
        next(err);
    }
}

exports.createTargetsByBranchId = function(req,res,next) {
    var branchId = req.params.id;
    var targets = req.body.targets;
    logger.info("target "+ targets);

    async.each(targets, function(target, callback){
    var bpIdSql = "SELECT bp.bp_id FROM `maithree-db`.`branch-product` bp, `maithree-db`.`product` p where p.id = bp.product_id and bp.branch_id = ? and p.name = ?";
    try {
        db.query(bpIdSql,[req.params.id, target.product_name], function(err, result) {
           if (err) {
             logger.error(err);
             return next(err);
           }
           logger.info("bp id found for "+ target.product_name + " : "+ result[0].bp_id);
           var sql = "INSERT into `product-target` (branch_product_id, effective_start_date, effective_end_date, quantity, created_date) values (?)"; 
           var values = [
               result[0].bp_id,
               new Date(),
               new Date(),
               target.quantity,
               new Date()
           ];
           console.log('before insert');
           console.log(values);
           db.query(sql,[values], function(err, insRes) {
               if (err) {
                   logger.error(err);
                   callback(err);
               }
               logger.info("Number of rows inserted " + insRes.affectedRows);
               callback(null,insRes.affectedRows);
               });    
 
           res.json({});
         });
     } catch (err) {
         logger.error(err);
         next(err);
     }
    });
}
