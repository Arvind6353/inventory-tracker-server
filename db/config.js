var mysql = require('mysql');
var logger = require('../utils/logger')

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: "root",
    password: "",
    database: 'maithree-db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("done");
    logger.info('db connection successful')
});

module.exports = connection;