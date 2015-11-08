module.exports = function(app) {

    var controller = {};
    var smoothieByPage = 20;

    controller.index = function(req, res) {
        var pageIndex = getPageIndex(req.query.page);

        app.models.SmoothieModel.find()
            .skip(pageIndex * smoothieByPage)
            .limit(smoothieByPage)
            .exec(function(err, smoothies) {
               if (err) {
                   res.json({err: 'an error occured while fetching data', body: null});
               }
               else {
                   res.json({ err: null, body: smoothies});
               }
            });
    }

    controller.show = function(req, res) {
        var smoothieID = req.params.smoothy;
        app.models.SmoothieModel.findById(smoothieID, function(err, smoothie) {
            if (err) {
                res.json({err: 'an error occurend while fecthing data', body: null});
            }
            else {
                res.json({err: null, body: smoothie});
            }
        });
    }

    controller.create = function(req, res) {
        console.log(req.body.fruits);
        var newSmoothie = new app.models.SmoothieModel({
            userId      : req.body.userId,
            name        : req.body.name,
            duration    : req.body.duration,
            fruits      : req.body.fruits
        });

        newSmoothie.save(function(err) {
            if (err) res.json({err: 'error while saving smoothie', body: null});
            else {
                res.json({err:null, body: 'smoothie saved'});
           }
        });
    }


    //GET
    //[IN] List<String> fruits
    //[OUT] List<Smoothie>
    controller.findByFruits = function(req, res) {
        var fruits = [];
        try {
            fruits = JSON.parse(req.query.fruits)
        }
        catch (e) {
            return res.json({err: 'must be a valid array', body:null});
        }
        app.models.SmoothieModel.findByFruits(fruits)
            .then(function(smoothies) {
               res.json({err: null, body: smoothies});
            }, function(error) {
                res.json({err: error.err, body: null});
            });
    }


    var getPageIndex = function(pageStr) {
        var pageIndex = 0;
        try {
            pageIndex = parseInt(query.page);
        }
        catch (e) {
            pageIndex = 0;
        }
        return pageIndex;
    }

    return controller;
}