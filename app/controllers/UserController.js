module.exports = function(app) {

    var controller = {};


    controller.index = function(req, res) {
        app.models.UserModel.find(function(err, usersFound) {
           if (err) res.json({err: 'Error while fetching user from database', body: null});
            else {
               res.json({err: null, body: usersFound});
           }
        });
    }

    controller.show = function(req, res) {
        app.models.UserModel.find({_id: req.params.userId}, function(err, userFound) {
            if (err) res.json({err: 'Error while fetching user from database', body: null});
            else {
                res.json({err: null, body: userFound});
            }
        });
    }


    controller.create = function(req, res) {
        //check if already exist (email unicity)
        app.models.UserModel.findByEmail(req.body.email).then(function(userFound) {
            if (userFound !== null && userFound.length > 0) {
                res.json({err: 'user already exists', body: null});
            }
            else {
                var newUser = new app.models.UserModel({
                    firstName   : req.body.firstName,
                    lastName    : req.body.lastName,
                    email       : req.body.email,
                    password    : app.utils.cryptoTools.encrypt(req.body.password)
                });
                newUser.save(function(err) {
                   if (err) {
                       res.json({err: 'error while saving new user', body:null});
                   }
                   else {
                       res.json({err: null, body: newUser.apiKey});
                   }
                });
            }
        }, function(err) {
            res.json({err: 'error while fetching user', body: null});
        });

    }

    controller.destroy = function(req, res) {
        app.models.UserModel.findById(req.params.user, function(err, userFound) {
            if (err) res.json({err: 'an error occured while fetching data', body: null});
            else {
                deleteUserSmoothies(userFound._id)
                    .then(function() {
                       userFound.remove(function(err) {
                          if (err) {
                              res.json({err: 'error while deleting user', body: null});
                          }
                          else {
                              res.json({err: null, body: 'user deleted'});
                          }
                       });
                    }, function(err) {
                        res.json({err: 'error while deleting users\' smoothies', body: null});
                    });

            }
        });
    }

    var deleteUserSmoothies = function(userId) {
        var deferred = app.q.defer();

        app.models.SmoothieModel.find({userId: userId}).remove(function(err) {
            if (err) deferred.reject(err);
            else deferred.resolve();
        });

        return deferred.promise;
    }

    return controller;

}