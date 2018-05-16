const bunyan = require('bunyan');
const bformat = require('bunyan-format');

const formatOut = bformat({
    outputMode: 'short'
});

const logger = bunyan.createLogger({
    name: "Maithree::app",
    stream: formatOut
});

module.exports = logger;
