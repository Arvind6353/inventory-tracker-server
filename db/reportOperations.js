var db = require("./config");
var logger = require("../utils/logger");

var async = require("async");
var moment = require("moment");

exports.getAllInventries = function(value, callBack){
    console.log(value);
    var filterByStartDate = "and pi.created_date > ? ";
    var filterByEndDate = "and pi.created_date < ? ";
    var orderBy = "order by b.name,p.name";

    var inventriesDetail = "\
    SELECT \
      b.name as branch_name, \
      p.name as product_name, \
      pi.quantity as quantity, \
      pi.comments as comments,\
      m.name as entered_by, \
      if(pi.end_day_enter='Y','Evening','Afternoon') as enter_session, \
      pi.created_date as entered_date \
    FROM `product-inventory` pi \
    join member m on m.code = pi.created_by \
    join `branch-product` bp on bp.bp_id = pi.bp_id \
    join `branch` b on b.id = bp.branch_id \
    join product p on p.id = bp.product_id \
    where quantity != 0 ";
    
    var sqlQuery = inventriesDetail
                    .concat(value.startDate ? filterByStartDate : '')
                    .concat(value.endDate ? filterByEndDate : '')
                    .concat(orderBy);
   
    try{
        db.query(sqlQuery,[value.startDate, value.endDate], function(err, result){
            if (err) {
                callBack(err, null);
            }
            logger.info("Inventry entry found", result.length);
            callBack(null, result);
        })
    }catch(err) {
        logger.error(err);
    } 

}

exports.getAllInventriesCount = function(value, callBack){
    console.log(value);
    var filterByStartDate = " and pi.created_date > ? ";
    var filterByEndDate = " and pi.created_date < ? ";
    var groupBy = " group by b.name, p.name "
    var orderBy = " order by b.name,p.name";
   
    var inventriesDetail = "\
    SELECT \
      b.name as branch_name, \
      p.name as product_name, \
      sum(pi.quantity) as total_quantity \
    FROM `product-inventory` pi \
    join `branch-product` bp on bp.bp_id = pi.bp_id \
    join `branch` b on b.id = bp.branch_id \
    join product p on p.id = bp.product_id \
    where quantity != 0 ";
    
    var sqlQuery = inventriesDetail
                    .concat(filterByStartDate)
                    .concat(filterByEndDate)
                    .concat(groupBy)
                    .concat(orderBy);
   
    var startDate = value.startDate || moment(new Date()).startOf("year").format("YYYY-MM-DD");
    var endDate = value.endDate || moment(new Date()).endOf("year").format("YYYY-MM-DD");
    console.log(startDate);
    console.log(endDate);
    try{
        db.query(sqlQuery,[startDate,endDate], function(err, result){
            if (err) {
                callBack(err, null);
            }
            logger.info("Inventry entry found for branch", result.length);
            callBack(null, result);
        })
    }catch(err) {
        logger.error(err);
        callBack(err, null);
    } 

}

exports.getAllInventriesCountByBranchId = function(value, callBack){
    console.log(value);
    var filterByStartDate = " and pi.created_date > ? ";
    var filterByEndDate = " and pi.created_date < ? ";
    var filterByBranchId = " and b.id = ? ";
    var groupBy = " group by b.name, p.name "
    var orderBy = " order by b.name,p.name";
   

    var inventriesDetail = "\
    SELECT \
      b.name as branch_name, \
      p.name as product_name, \
      pi.bp_id as branch_product_id, \
      sum(pi.quantity) as total_quantity \
    FROM `product-inventory` pi \
    join `branch-product` bp on bp.bp_id = pi.bp_id \
    join `branch` b on b.id = bp.branch_id \
    join product p on p.id = bp.product_id \
    where quantity != 0 ";
    
    var sqlQuery = inventriesDetail
                    .concat(filterByStartDate)
                    .concat(filterByEndDate)
                    .concat(value.branchId ? filterByBranchId : '')
                    .concat(groupBy)
                    .concat(orderBy);
   
    var startDate = value.startDate || moment(new Date()).startOf("year").format("YYYY-MM-DD");
    var endDate = value.endDate || moment(new Date()).endOf("year").format("YYYY-MM-DD");
    console.log(startDate);
    console.log(endDate);
    try{
        db.query(sqlQuery,[startDate,endDate,parseInt(value.branchId)], function(err, result){
            if (err) {
                callBack(err, null);
            }
            logger.info("Inventry entry found for branch", result.length);
            callBack(null, result);
        })
    }catch(err) {
        logger.error(err);
        callBack(err, null);
    }
}
