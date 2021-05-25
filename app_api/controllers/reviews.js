const mongoose = require('mongoose');
const { AppNotFoundError, AppError, AppBadRequestError } = require('../utils/errors');
const locationModel = mongoose.model('Location');
const userModel = mongoose.model('User');

const getAuthor = (req, res, next, callback) => {
  if (req.payload?.email) {
    userModel
      .findOne({ "email": req.payload.email })
      .exec((err, user) => {
        if (!user) {
          return next(new AppNotFoundError("User not found"));
        } else if (err) {
          return next(new AppError("err.message"));
        }
        callback(req, res, user.name);
      });
  } else {
    return next(new AppNotFoundError("User not found"));
  }
};

const doSetAverageRating = (location) => {
  if (location.reviews && location.reviews.length > 0) {
    const count = location.reviews.length;
    const total = location.reviews.reduce((acc, { rating }) => {
      return acc + rating;
    }, 0);

    location.rating = parseInt(total / count, 10);
    location.save(err => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Average rating updated to ${location.rating}`);
      }
    });
  }
};

const updateAverageRating = (locationId) => {
  locationModel
    .findById(locationId)
    .select('rating reviews')
    .exec((err, location) => {
      if (!err) {
        doSetAverageRating(location);
      }
    });
};

const doAddReview = (req, res, next, location, author) => {
  if (!location) {
    throw new AppNotFoundError("Location not found");
  } else {
    const { rating, reviewText } = req.body;
    location.reviews.push({
      author,
      rating,
      reviewText
    });
    location.save((err, location) => {
      if (err) {
        return next(new AppError("err.message"));
      } else {
        updateAverageRating(location._id);
        const newReview = location.reviews.slice(-1).pop();
        res
          .status(201)
          .json(newReview);
      };
    });
  };
};

const reviewsCreate = (req, res, next) => {
  getAuthor(req, res, next, (req, res, next, username) => {
    const locationId = req.params.locationId;
    if (locationId) {
      locationModel
        .findById(locationId)
        .select('reviews')
        .exec((err, location) => {
          if (err) {
            res
              .status(400)
              .json(err);
          } else {
            doAddReview(req, res, next, location, username);
          }
        });
    } else {
      return next(new AppNotFoundError("Location not found"));
    }
  });
};

const reviewsReadOne = (req, res, next) => {
  locationModel
    .findById(req.params.locationId)
    .select('name reviews')
    .exec((err, location) => {
      if (err) {
        return next(new AppNotFoundError(err.message));
      } else if (!location) {
        return next(new AppNotFoundError("Location not found"));
      }

      if (location.reviews && location.reviews.length > 0) {
        const review = location.reviews.id(req.params.reviewId)
        if (!review) {
          return next(new AppNotFoundError("Reviews not found"));
        } else {
          response = {
            location: {
              name: location.name,
              id: req.params.locationId
            },
            review
          };
          return res
            .status(200)
            .json(response);
        }
      } else {
        return next(new AppNotFoundError("Reviews not found"));
      }

    });
};

const reviewsUpdateOne = (req, res, next) => {
  if (!req.params.locationId || !req.params.reviewId) {
    return next(new AppBadRequestError("Not found, locationId and reviewId are both required"));
  }
  locationModel
    .findById(req.params.locationId)
    .select('reviews')
    .exec((err, location) => {
      if (!location) {
        return next(new AppNotFoundError("Location not found"));
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }
      if (location.reviews && location.reviews.length > 0) {
        const thisReview = location.reviews.id(req.params.reviewId);
        if (!thisReview) {
          return next(new AppNotFoundError("Review not found"));
        } else {
          thisReview.author = req.body.author;
          thisReview.rating = req.body.rating;
          thisReview.reviewText = req.body.reviewText;
          location.save((err, location) => {
            if (err) {
              return next(new AppNotFoundError(err.message));
            } else {
              updateAverageRating(location._id);
              res
                .status(200)
                .json(thisReview);
            }
          });
        }
      } else {
        return next(new AppNotFoundError("Review not found"));
      }
    }
    );
};

const reviewsDeleteOne = (req, res, next) => {
  const { locationId, reviewId } = req.params;
  if (!locationId || !reviewId) {
    return next(new AppBadRequestError("Not found, locationId and reviewId are both required"));
  }

  locationModel
    .findById(locationId)
    .select('reviews')
    .exec((err, location) => {
      if (!location) {
        return next(new AppNotFoundError("Location not found"));
      } else if (err) {
        return next(new AppError(err.message));
      }

      if (location.reviews && location.reviews.length > 0) {
        if (!location.reviews.id(reviewId)) {
          return next(new AppNotFoundError("Review not found"));
        } else {
          location.reviews.id(reviewId).remove();
          location.save(err => {
            if (err) {
              return next(new AppNotFoundError(err.message));
            } else {
              updateAverageRating(location._id);
              res
                .status(204)
                .json(null);
            }
          });
        }
      } else {
        return next(new AppNotFoundError("Review not found"));
      }
    });
};

module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne
};