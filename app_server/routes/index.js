let express = require('express');
let ctrlLocations = require('../controllers/locations');
let ctrlOthers = require('../controllers/others');

let router = express.Router();

// Locations pages
router.get('/', ctrlLocations.homeList);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

// Others pages
router.get('/about', ctrlOthers.about);

module.exports = router;
