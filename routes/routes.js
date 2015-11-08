module.exports = function(app) {
    app.use(function(req, res, next) {
        console.log(req.url);
        next();
    });

    app.all('/', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    app.get('/smoothies/findSmoothiesByFruits', app.controllers.smoothieController.findByFruits);
    app.resource('smoothies', app.controllers.smoothieController);

    app.resource('users', app.controllers.userController);

}