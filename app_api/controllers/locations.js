const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;
const { AppBadRequestError, AppNotFoundError, AppError } = require('../utils/errors');
const locationModel = mongoose.model('Location');

const locationsListByDistance = async (req, res, next) => {
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
        return next(new AppBadRequestError("lng and lat query parameters are required"));
    }

    try {
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
                coords:result.coords,
                distance: `${result.distance.calculated.toFixed()}`
            }
        });
        res
            .status(200)
            .json(locations);

    } catch (err) {
        return next(new AppNotFoundError("No locations found"));
    }
};

const locationsCreate = (req, res, next) => {
    locationModel
        .create({
            name: req.body.name,
            address: req.body.address,
            facilities: req.body.facilities,
            coords: {
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
        }, (err, location) => {
            if (err) {
                console.log("Bad request");
                return next(new AppNotFoundError(err.message));

            } else {
                res
                    .status(201)
                    .json(location);
            }

        });
};

const locationsReadOne = (req, res, next) => {

    if (objectId.isValid(req.params.locationId)) {
        locationModel
            .findById(req.params.locationId)
            .exec((err, location) => {
                if (err) {
                    return next(new AppNotFoundError(err.message));
                } else if (!location) {
                    console.log("return error");
                    return next(new AppNotFoundError("location not found"));
                } else {
                    return res
                        .status(200)
                        .json(location);
                }
            });
    } else {
        return next(new AppBadRequestError ("Please pass a valid location id."));
    }
};

const locationsUpdateOne = (req, res, next) => {
    locationModel
        .findById(req.params.locationId)
        .exec((err, location) => {
            if (err) {
                return next(new AppNotFoundError(err.message));
            } else if (!location) {
                return next(new AppNotFoundError("location not found"));
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
                    if (err) {
                        return next(new AppError("Error occured while updating the location"));
                    } else {
                        return res
                            .status(200)
                            .json(location);
                    };
                });
            }
        });
};

const locationsDeleteOne = (req, res, next) => {
    const locationId = req.params.locationId;
    if (objectId.isValid(locationId)) {
        console.log("try deleting locationId =>", locationId);
        locationModel
            .findByIdAndRemove(locationId)
            .exec((err, location) => {
                if (err) {
                    return next(new AppNotFoundError(err.message));
                } else if (location) {
                    res
                        .status(204)
                        .json(null);
                }
            });
    } else {
        return next(new AppBadRequestError("Please pass a valid Location Id."));
    }
};

module.exports = {
    locationsListByDistance,
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne
};