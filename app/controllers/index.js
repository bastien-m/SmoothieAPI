/**
 * Created by bastien on 23/08/2015.
 */

module.exports = function(app) {
    app.controllers = {};
    app.controllers.smoothieController = require('./SmoothieController')(app);
    app.controllers.userController = require('./UserController')(app);
}