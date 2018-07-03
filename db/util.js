
exports.decrypt = decrypt;

function decrypt(text, key){
    var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = key;
    
    var decipher = crypto.createDecipher(algorithm,password)

    var dec = decipher.update(text,'hex','utf8')

    dec += decipher.final('utf8');

    return dec;
}
