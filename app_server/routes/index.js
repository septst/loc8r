let express = require('express');
let ctrlLocations = require('../controllers/locations');
let ctrlOthers = require('../controllers/others');

let router = express.Router();

// Locations pages
router.get('/', ctrlLocations.homeList);
router.get('/location/:locationId', ctrlLocations.locationInfo);
router
  .route('/location/:locationId/review/new')
  .get(ctrlLocations.addReview)
  .post(ctrlLocations.doAddReview);

// Others pages
router.get('/about', ctrlOthers.about);

module.exports = router;
