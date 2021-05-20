const mongoose = require('mongoose');
const locationModel = mongoose.model('Location');

const locationsListByDistance = async (req, res) => {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const near = {
        type: "Point",
        coordinates: [lng, lat]
    };
    const geoOptions = {
        distanceField: "distance.calculated",
        key: 'coords',
        spherical: true,
        maxDistance: 20000,
        $limit: 10
    };
    if ((!lng && lng !== 0) || (!lat && lat !== 0)) {
        return res
            .status(404)
            .json({ "message": "lng and lat query parameters are required" });
    }

    try{
        const results = await locationModel.aggregate([
            {
              $geoNear: {
                near,
                ...geoOptions
              }
            }
          ]);
          const locations = results.map(result => {
            return {
              _id: result._id,
              name: result.name,
              address: result.address,
              rating: result.rating,
              facilities: result.facilities,
              distance: `${result.distance.calculated.toFixed()}`
            }
          });
          res
            .status(200)
            .json(locations);

    }catch(err){
        res
            .status(404)
            .json(err);
    }
};

const locationsCreate  = (req, res) => {
    locationModel
        .create({
            name: req.body.name,
            address: req.body.address,
            facilities: req.body.facilities,
            coords:{
                type: "Point",
                coordinates: [
                    parseFloat(req.body.lang),
                    parseFloat(req.body.lat)
                ]
            },
            openingTimes: [
                {
                  days: req.body.days1,
                  opening: req.body.opening1,
                  closing: req.body.closing1,
                  closed: req.body.closed1
                },
                {
                  days: req.body.days2,
                  opening: req.body.opening2,
                  closing: req.body.closing2,
                  closed: req.body.closed2
                }
              ]
        },  (err, location) => {
            if(err){
                res
                    .status(400)
                    .json(err);

            }else{
                res
                    .status(201)
                    .json(location);
            }

        });
};

const locationsReadOne = (req, res) => {

    locationModel
      .findById(req.params.locationId)
      .exec((err, location) => {
        if (err) {
            return res
                .status(404)
                .json(err);
        } else if (!location) {
            return res
                .status(404)
                .json({"message": "location not found"});
        } else {
            location.coordinates = {
                longitude: location.coords.coordinates[0],
                latitude: location.coords.coordinates[1]
            };
            console.log("location =>", location.coordinates);
            return res
                .status(200)
                .json(location);
        }
      });
};

const locationsUpdateOne  = (req, res) => {
    locationModel
      .findById(req.params.locationId)
      .exec((err, location) => {
        if (err) {
            return res
                .status(404)
                .json(err);
        } else if (!location) {
            return res
                .status(404)
                .json({"message": "location not found"});
        } else {
            location.name = req.body.name;
            location.address = req.body.address;
            location.facilities = req.body.facilities.split(',');
            location.coords = [
                parseFloat(req.body.lng),
                parseFloat(req.body.lat)
            ];
            location.openingTimes = [{
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1,
            }, {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2,
            }];
            location.save((err, location) => {
                if(err){
                    return res  
                        .status(500)
                        .json({"message": "Error occured while updating the location"});

                }else{
                    return res
                        .status(200)
                        .json(location);
                };
            });
        }
      });
};

const locationsDeleteOne  = (req, res) => {
    const {locationId} = req.params;
    if(!locationId){
        locationModel
        .findByIdAndRemove(locationid)
        .exec((err, location) => {
            if (err) {
              return res
                .status(404)
                .json(err);
            }
            res
              .status(204)
              .json(null);
          });
    }else{
        res
            .status(400)
            .json({"message": "Location Id is required."});
    }
};

module.exports = {
    locationsListByDistance,
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne
};