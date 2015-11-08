/**
 * Created by bastien on 26/08/2015.
 */

module.exports = function(app) {
    app.utils = {};
    app.utils.cryptoTools = require('./CryptoTools')(app);
}