var mysql = require('mysql');
var logger = require('../utils/logger')
var k = process.env.key
var decrypt = require("./util").decrypt;

var connection = mysql.createConnection({
    host:'maithree-db-instance.ctxmyhrbijyy.us-east-2.rds.amazonaws.com',
    user: decrypt("dea3c0baabc23256", k),
    password : decrypt("fea3e0ba8bc232560a9d8b",k),
    database: 'maithree',
    dateStrings : true
});

// /*LOCAL INSTANCE*/
// var connection = mysql.createConnection({
//     host:'localhost',
//     user: "root",
//     password : "",
//     database: 'maithree-db',
//     dateStrings : true
// });
/*END LOCAL INSTANCE*/

var createConnection = function() {
    
    
    connection.connect(function (err) {
        if (err) throw err;
        console.log("done");
        logger.info('db connection successful')
    });
    
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
          createConnection();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
          throw err;                                  // server variable configures this)
        }
      });
    
    }

    createConnection();
    
module.exports = connection;

