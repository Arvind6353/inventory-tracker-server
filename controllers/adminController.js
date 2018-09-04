var db = require("../db/config");
var logger = require("../utils/logger");

var async = require("async");
var moment = require("moment");
var momentTz = require('moment-timezone');
var _ = require("lodash");

exports.getBranchProductDetailsForTarget = function(req, res, next){
  var date = req.query.date;
  async.waterfall([
    function getFromBranchProduct(callback) {
        var sql = "select a.id, b.branch_id, b.bp_id, 'target' as TempField from `product` a, `branch-product` b where a.id = b.product_id order by a.id;"  
          executeQuery(sql, function(data) {
              callback(null, data);
          });
    },
    function getTarget(resultData, callback) {
        var sql = "select branch_product_id , quantity as targetVal from `product-target` where effective_start_date <= ? and effective_end_date >= ?"  
        db.query(sql,[date, date], function(err, result) {
            if (err) {
                logger.error(err);
            }
          
           const r = groupBy(result, (c) => c.branch_product_id);
           const op = resultData.map((rs,i)=>{
               return  Object.assign({},rs, {targetVal : r[rs.bp_id] && r[rs.bp_id][0] ? r[rs.bp_id][0].targetVal : 0} );
            })
            callback(null, op);
        });
    },
    function groupByBranchId(targetData, callback) {
        const result = groupBy(targetData, (c) => c.id);
      
        callback(null, result);
    },
    function getBranchesAndFormTemplate(groupedBranches, callback) {
        // branches order 1001,1002- form template {}
        var sql = "SELECT * from `branch` ";
        db.query(sql, function(err, result) {
            if (err) {
                logger.error(err);
            }
            logger.info("Number of branchces " + result.length);
            var template = {};
            result.map((rs,i)=> {
                template[rs.id.toString()]= {
                    "id":'',
                    "branch_id":rs.id,
                    "bp_id": '',
                    "isEnabled": false,
                    "targetVal":0
                };
            });
       
            callback(null , {groupedBranches , template})
            
        });
    },
    function (prevdata, callback) {
        var bdata = prevdata.groupedBranches;
        var template = prevdata.template;
        var sql = "SELECT * FROM product";
        executeQuery(sql, function(data) {
            let productData = data
            for(let i in productData) {
                var temp = Object.assign({},template);
                let pId = productData[i].id.toString();
                let productUsedInBranches = bdata[pId];
                if(productUsedInBranches == undefined) {
                    productData[i]['targetData'] = Object.values(temp);
                   
                } else {
                    for(var j=0; j<productUsedInBranches.length ; j++) {
                        var id = productUsedInBranches[j].branch_id.toString();
                        if(temp[id]){
                            temp[id] = productUsedInBranches[j];
                            temp[id].isEnabled = true;
                        }
                    }
                        productData[i]['targetData'] = Object.values(temp);
                }
                
            }
            callback(null, productData);
        })
    }
], function (err, result) {
     res.json(result);
});
}


function executeQuery(sqlQuery, cb) {
  try {

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


exports.createOrReplaceTargets = createOrReplaceTargets;

function createOrReplaceTargets(req, res, next) {
 var date = req.body.date;
 var targets = req.body.targets;
 console.log(date , targets.length);

 async.eachSeries(targets, function(target, callback) {
    var updatequery = "update `product-target` set quantity = ? , created_date = ? where effective_start_date = ? and branch_product_id = ? ";
    try {
        db.query(updatequery,[target.targetVal, new Date(), date, target.bp_id], function(err, result) {
            if (err) {
              logger.error(err);
            }
            if(result.affectedRows == 0) {
                var sql = "INSERT into `product-target` (branch_product_id, effective_start_date, effective_end_date, quantity, created_date) values (?)"; 
                var values = [
                    target.bp_id,
                    momentTz(date).tz("Asia/Kolkata").startOf("month").format("YYYY-MM-DD HH:mm:ss"),
                    momentTz(date).tz("Asia/Kolkata").endOf("month").format("YYYY-MM-DD HH:mm:ss"),
                    target.targetVal,
                    new Date()
                ];
                db.query(sql,[values], function(err, insRes) {
                    if (err) {
                        logger.error(err);
                    }
                });    
            }
        });
    } catch (err) {
        logger.error(err);
    }
    callback(null, []);
 }, function(err, result){
     if(err) {
        return res.json({status : false}); 
     }
    return res.json({status : true}); 
    
 })
}