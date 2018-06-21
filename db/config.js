var mysql = require('mysql');
var logger = require('../utils/logger')

var connection = mysql.createConnection({
   // host: '10.176.16.106',
    host:'us-cdbr-iron-east-04.cleardb.net',
   // host : 'localhost',
   //port: '3301',
   //user: "admin",
  // user : "root",
    //password : '',
    //password: "Admin",
   // password: "Admin1234!",
   // database: 'maithree-db',
   // password: "Admin",
    password: "0bbde678",
    user : "b8595257fb7838",
    //password: "Admin1234!",
    //database: 'maithree-db',

    database: 'heroku_ae2a23a8d252231',
    timezone: 'utc'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("done");
    logger.info('db connection successful')
});

module.exports = connection;

