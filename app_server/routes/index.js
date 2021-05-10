let express = require('express');
let ctrlMain = require('../controllers/main');
let router = express.Router();

router.get('/', ctrlMain.index);

module.exports = router;
