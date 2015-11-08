/**
 * Created by bastien on 25/08/2015.
 */

var crypto = require('crypto');

module.exports = function(app) {
    var cryptoModule = {};
    cryptoModule.encrypt = function(text) {
        var cipher = crypto.createCipher('aes-256-ctr', app.cfg.secret);
        var crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }

    cryptoModule.decrypt = function(text) {
        var decipher = crypto.createDecipher('aes-256-ctr', app.cfg.secret);
        var dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }

    cryptoModule.generateApiKey = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    return cryptoModule;

}