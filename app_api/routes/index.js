const express = require('express');
const expressJwt = require('express-jwt');
const router = express.Router();

const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');
const ctrlSecrets = require('../controllers/secrets');
const ctrlAuth = require('../controllers/auth');

const auth = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['sha1', 'RS256', 'HS256']
    // credentialsRequired: false,
    // getToken: function getAccessToken(req) {
    //     const authHeader = req.headers.authorization;
    //     if (authHeader) {
    //         const token = authHeader.split(' ')[1];
    //         return token;
    //     }
    //     return null;
    // }
});

//auth
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

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
    .post(auth, ctrlReviews.reviewsCreate);
router
    .route('/locations/:locationId/reviews/:reviewId')
    .get(ctrlReviews.reviewsReadOne)
    .put(auth, ctrlReviews.reviewsUpdateOne)
    .delete(auth, ctrlReviews.reviewsDeleteOne);

//secrets
router
    .route('/secrets/:key')
    .get(ctrlSecrets.getSecretByKey);

module.exports = router;