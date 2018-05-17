var mysql = require('mysql');
var logger = require('../utils/logger')

var connection = mysql.createConnection({
    host: 'localhost',
   // port: '3301',
    user: "root",
   // password: "Admin",
    password: "",
    database: 'maithree-db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("done");
    logger.info('db connection successful')
});

module.exports = connection;