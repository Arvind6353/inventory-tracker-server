var mysql = require('mysql');
var logger = require('../utils/logger')

var connection = mysql.createConnection({
  host: '10.176.16.106',
   //host:'us-cdbr-iron-east-04.cleardb.net',
  // host : 'localhost',
  //port: '3301',
  user: "admin",
 // user : "root",
   //password : '',
   //password: "Admin",
 password: "Admin1234!",
  // database: 'maithree-db',
  // password: "Admin",
  // password: "0bbde678",
   //user : "b8595257fb7838",
   //password: "Admin1234!",
   database: 'maithree-db',

   //database: 'heroku_ae2a23a8d252231',
   timezone: 'utc'
});

var createConnection = function() {
    
   connection = mysql.createConnection({
    host: '10.176.16.106',
     //host:'us-cdbr-iron-east-04.cleardb.net',
    // host : 'localhost',
    //port: '3301',
    user: "admin",
   // user : "root",
     //password : '',
     //password: "Admin",
   password: "Admin1234!",
    // database: 'maithree-db',
    // password: "Admin",
    // password: "0bbde678",
     //user : "b8595257fb7838",
     //password: "Admin1234!",
     database: 'maithree-db',
 
     //database: 'heroku_ae2a23a8d252231',
     timezone: 'utc'
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

