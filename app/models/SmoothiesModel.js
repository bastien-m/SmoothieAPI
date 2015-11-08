var mongoose = require('mongoose');

module.exports = function(app) {

    var q = app.q;

    var SmoothieModel = {};

    var smoothieSchema = new mongoose.Schema({

        userId      : {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
        name        : {type: String},
        duration    : {type: Number},
        rank        : {type: Number},
        fruits      : [{type: String}],
        image       : {type: Buffer},
        comments    : {
            text        : {type: String},
            createdAt   : {type: Date, default: new Date()},
            writer      : {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
        },
        createdAt  : {type: Date, default: new Date()},
        updatedAt  : {type: Date, default: new Date()},


    });

    SmoothieModel = mongoose.model('Smoothies', smoothieSchema);


    SmoothieModel.findByUserId = function(userId) {
        var deferred = q.defer();

        SmoothieModel.find({userId: userId}, function(err, smoothiesFound) {
           if (err) {
               deferred.reject(err);
           }
           else {
               deferred.resolve(smoothiesFound);
           }
        });

        return deferred.promise;
    }

    SmoothieModel.findByFruits = function(fruitsParams) {
        var deferred = q.defer();
        SmoothieModel.find({fruits: {'$in': fruitsParams}}, function(err, smoothiesFound) {
           if (err) {
               deferred.reject(err);
           } else {
               deferred.resolve(smoothiesFound);
           }
        });
        return deferred.promise;
    }

    return SmoothieModel;

}