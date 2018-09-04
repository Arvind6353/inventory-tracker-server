var db = require("../../db/config");
var logger = require("../../utils/logger");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var secrectjson = require('../../db/secret.json');


exports.register = function(req,res,next) {
	
	try {
		var sql = "INSERT into authentication (username,password,isAdmin) values (?)"
		var salt = bcrypt.genSaltSync(10);
		var passwordHash = bcrypt.hashSync(req.body.password, salt);
		console.log(passwordHash);
		var values = [req.body.username, passwordHash, 'Y'];

		

		db.query(sql, [values], function(err, result) {
	        if (err) {
	            logger.error(err);
	            callback(err);
	        }
	    logger.info("Number of rows inserted " + result.affectedRows);
	    res.json(result);
	    });
	}catch (err) {
        logger.error(err);
        next(err);
    }
}

exports.login = function(req,res,next) {
	
	try {
		var sql = "select * from authentication where username = ?";
		var values = [req.body.username]
		 db.query(sql, values, function(err, result) {
          if (err) {
            logger.error(err);
            return next(err);
          }
         var p = result[0].password;
         if(bcrypt.compareSync(req.body.password, p)) {
         		var token = jwt.sign({ id: result[0].username , isAdmin : result[0].isAdmin}, secrectjson.secret, {
			      expiresIn: 86400 // expires in 24 hours
			    });

			  return  res.json({token, isAdmin: result[0].isAdmin});
          }
          res.json("Invalid username / password");
        });
	}catch (err) {
        logger.error(err);
        next(err);
    }
}

