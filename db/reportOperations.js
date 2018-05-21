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
   
     console.log(sqlQuery);   

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