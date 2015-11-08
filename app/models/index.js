module.exports = function(app) {

    app.models = {};

    app.models.SmoothieModel = require('./SmoothiesModel')(app);
    app.models.UserModel = require('./UsersModel')(app);

}