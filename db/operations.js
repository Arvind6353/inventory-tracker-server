var db = require("./config");
var utils = require("../utils");
var logger = require("../utils/logger");

exports.addMerchants = function(pid, emails, cb) {
  var sql = "INSERT INTO generic_whitelist (partnerid, merchantid) VALUES ?";
  try {
    var encpid = utils.encrypt(pid);
    var values = emails.map(email => [encpid, utils.encrypt(email)]);

    db.query(sql, [values], function(err, result) {
      if (err) {
        cb(err, null);
      }
      logger.info("Number of records inserted: " + result.affectedRows);
      cb(null, result.affectedRows);
    });
  } catch (err) {
    logger.error(err);
  }
};

exports.checkMerchantAuth = function(partnerEmail, merchantEmail, cb) {
  var sql =
    "SELECT * FROM generic_whitelist WHERE partnerid = ? AND merchantid = ?";
  db.query(
    sql,
    [
      utils.encrypt(partnerEmail).toString(),
      utils.encrypt(merchantEmail).toString()
    ],
    function(err, result) {
      if (err) cb(err, null);
      if (result && result.length > 0) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    }
  );
};

// method to add partner
exports.addPartner = function(data, cb) {
  var sql =
    "INSERT INTO partner_details (partner_id,partner_name,country,partner_code,country_wide_check,merchant_url,terms_url,partner_payer_id,type,sub_type,subject,description,service_email) VALUES (?)";
  var values = [
    data.partnerId,
    data.partnerName,
    data.country,
    data.partnerCode,
    data.countryWideCheck,
    data.merchantUrl,
    "",
    data.partnerPayerId,
    data.type,
    data.subType,
    data.subject,
    data.description,
    data.serviceEmail
  ];

  db.query(sql, [values], function(err, result) {
    if (err) {
      cb(err, null);
    } else {
      logger.info("Number of records inserted: " + result.affectedRows);
      cb(null, result.affectedRows);
    }
  });
};

exports.getPartnerConfig = function(cb) {
  var sql = "SELECT * FROM partner_details";
  db.query(sql, function(err, result) {
    if (err) cb(err, null);
    if (result && result.length > 0) {
      cb(null, result);
    } else {
      cb(null, []);
    }
  });
};

exports.updateTermsUrl = function(code, path, cb) {
  var sql = "update partner_details set terms_url = ? where partner_code = ?";
  var values = [path.toString(), code.toString()];
  db.query(sql, values, function(err, result) {
    if (err) {
      cb(err, null);
    } else {
      logger.info("Number of records updated: " + result.affectedRows);
      cb(null, result.affectedRows);
    }
  });
};

exports.checkForAlreadyVisitedMerchant = function(partnerId, merchantId) {
  return new Promise(function(resolve, reject) {
    var sql =
      "SELECT * FROM special_pricing WHERE partner_id = ? AND merchant_id = ?";
    db.query(sql, [partnerId.toString(), merchantId.toString()], function(
      err,
      result
    ) {
      if (err) reject(err);
      if (result && result.length > 0) {
        logger.info("found some record for merchant tc");
        resolve(true);
      } else {
        logger.info("entry not found for merchant tc");
        resolve(false);
      }
    });
  });
};

exports.addEntryInSpecialPricingTable = function(payload, salesForceResult) {
  return new Promise(function(resolve, reject) {
    var sql =
      "INSERT into special_pricing (partner_id,merchant_id,guid,timestamp,special_pricing_status,salesforce_case_id,backlogmerchant) VALUES (?)";

    var values = [
      payload["partner-id"],
      payload["merchant-payer-id"],
      payload.guid,
      payload.timeStamp,
      salesForceResult.specialPricingStatus,
      salesForceResult.salesForceCaseId,
      null
    ];

    db.query(sql, [values], function(err, result) {
      if (err) reject(err);
      else {
        logger.info("Number of records inserted: " + result.affectedRows);
        resolve(result.affectedRows);
      }
    });
  });
};

exports.addEntryInSalesForceDetailsTable = function(payload, salesForceResult) {
  return new Promise(function(resolve, reject) {
    var sql =
      "INSERT into salesforcedetails (salesforce_case_id,OwnerID,recordTypeId,Country_Primary__c,Client_Reference_ID__c,PayPal_Account_ID__c,Sub_Type__c,Type,description,subject,timestamp,Partner_Ref_Num__c) VALUES (?)";

    var values = [
      salesForceResult.salesForceCaseId,
      "00G80000002qUj4",
      "01280000000UMU3",
      payload.partnerCountry,
      payload["merchant-payer-id"],
      utils.encrypt(salesForceResult.paypalAccountNumber),
      payload.subType,
      payload.type,
      payload.description,
      payload.subject,
      payload.timeStamp,
      payload["partner-id"]
    ];

    db.query(sql, [values], function(err, result) {
      if (err) reject(err);
      else {
        logger.info("Number of records inserted: " + result.affectedRows);
        resolve(result.affectedRows);
      }
    });
  });
};


exports.getPartnerByPartnerPayerId = function(id, cb) {
//logger.info("PartnerId "+id);
  var sql = "SELECT * FROM partner_details where partner_payer_id = ?";
  db.query(sql, [ id.toString() ], function(err, result) {
    if (err) {
      logger.error(err);
      cb(err, null);
      return;
    }
    if (result && result.length > 0) {
      cb(null, result);
    } else {
      cb(null, []);
    }
  });
};