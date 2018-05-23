var mysql = require('mysql');
var logger = require('../utils/logger')

var connection = mysql.createConnection({
    //host: '10.176.16.106',
    host : 'localhost',
    port: '3301',
   // user: "admin",
     user : "root",
    //password : '',
    password: "Admin",
   // password: "Admin1234!",
    database: 'maithree-db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("done");
    logger.info('db connection successful')
});

module.exports = connection;