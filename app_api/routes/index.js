const express = require('express');
const router = express.Router();

const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');
const ctrlSecrets = require('../controllers/secrets');

// Locations
router
    .route('/locations')
    .get(ctrlLocations.locationsListByDistance)
    .post(ctrlLocations.locationsCreate);

router
    .route('/locations/:locationId')
    .get(ctrlLocations.locationsReadOne)
    .put(ctrlLocations.locationsUpdateOne)
    .delete(ctrlLocations.locationsDeleteOne);

// Reviews
router
    .route('/locations/:locationId/reviews')
    .post(ctrlReviews.reviewsCreate);
router
    .route('/locations/:locationId/reviews/:reviewId')
    .get(ctrlReviews.reviewsReadOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);

//secrets
router
    .route('/secrets/:key')
    .get(ctrlReviews);

module.exports = router;