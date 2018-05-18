var db = require("../db/config");
var logger = require("../utils/logger");

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

exports.createBranch = function(req,res,next) {
    var sql = "INSERT into branch (partner_id,merchant_id,guid,timestamp,special_pricing_status,salesforce_case_id,backlogmerchant) VALUES (?)"; 
    var values = [
        payload["partner-id"],
        payload["merchant-payer-id"],
        payload.guid,
        payload.timeStamp,
        salesForceResult.specialPricingStatus,
        salesForceResult.salesForceCaseId,
        null
      ];
    try {
       db.query(sql,[values], function(err, result) {
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
    var sql = "SELECT * from member where ID = ?";
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


// exports.createBranch = function(req, res,next) {
//     Branch.create(req.body)
//     .then( data =>{ res.json(data) })
//     .catch(err => next(err));
// }

// exports.deleteAllBranch = function(req,res,next) {
//     Branch.remove({}).exec()
//     .then( data => {res.send(`deleted all branches succesfully`) })
//     .catch(err => next(err));
// }



// exports.updateBranchById = function(req,res,next) {
//     Branch.findByIdAndUpdate(req.params.id,{$set :req.body}, {new :true})
//     .then( data => {res.send(`updated succesfully ${req.body.name}`) })
//     .catch(err => next(err));
// }

// exports.deleteBranchById = function(req,res,next) {
//     Branch.findByIdAndRemove(req.params.id).exec()
//     .then( data => { res.send(`deleted succesfully`) })
//     .catch(err => next(err));  
// }
