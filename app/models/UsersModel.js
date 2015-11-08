var mongoose = require('mongoose');
var moment = require('moment');

module.exports = function(app) {
    var q = app.q;

    var UserModel = {};

    var userSchema = new mongoose.Schema({

        firstName       : {type: String},
        lastName        : {type: String},
        email           : {type: String},
        password        : {type: String},
        apiKey          : {type: String},
        createdAt       : {type: String, default: moment().format('MM-DD-YYYY')},
        updatedAt       : {type: String, default: moment().format('MM-DD-YYYY')}

    });

    userSchema.pre('save', function(done) {
        this.apiKey = app.utils.cryptoTools.generateApiKey();
        console.log(this.apiKey);
        done();
    });

    UserModel = mongoose.model('Users', userSchema);


    UserModel.findByEmail = function(emailParam) {
        var deferred = q.defer();
        UserModel.find({email: emailParam}, function(err, userFound) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(userFound);
            }
        });
        return deferred.promise;
    };


    UserModel.authenticate = function(email, password) {
        var deferred = q.defer();

        UserModel.find({email: email, password: password}, function(err, userFound) {
           if (err) {
               deferred.reject(err);
           }
           else {
               if (userFound !== null && userFound.length === 1) {
                   if (app.utils.cryptoTools.decrypt(userFound[0].password) === password) {
                       deferred.resolve(userFound[0]);
                   }
                   else {
                       deferred.resolve(null);
                   }
               }
               else {
                   deferred.resolve(null);
               }
           }
        });

        return deferred.promise;
    }

    return UserModel;
}