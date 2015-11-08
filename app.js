/**
 * Created by bastien on 23/08/2015.
 */

var express         = require('express'),
    resource        = require('express-resource'),
    app             = express(),
    errorHandler    = require('errorhandler'),
    bodyParser      = require('body-parser'),
    path            = require('path'),
    config          = require(path.join(__dirname, 'config', 'config.json'))[app.get('env')],
    methodOverride  = require('method-override'),
    mongoose        = require('mongoose'),
    _               = require('lodash'),
    q               = require('q'),
    passport        = require('passport'),
    async           = require('async');


app.cfg = config;
app.async = async;
app.q = q;

mongoose.connect(app.cfg.dburl);

console.log(app.get('env'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

require(path.join(__dirname, 'app', 'utils'))(app);
require(path.join(__dirname, 'app', 'models'))(app);
require(path.join(__dirname, 'app', 'controllers'))(app);
require(path.join(__dirname, 'routes', 'routes'))(app);

if (app.get('env') === 'development') {
    app.use(errorHandler());
}

app.listen(app.cfg.port, function() {
   console.log('Express server listening on port ' + app.cfg.port);
});