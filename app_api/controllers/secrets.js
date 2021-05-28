const logger = require('../middlewares/logger');
const { AppBadRequestError, AppNotFoundError } = require('../utils/errors');

const getSecretByKey = (req, res, next) => {
    if (!(Object.keys(req.query).length === 0) || !req.params.key) {
        return new AppBadRequestError("key is required");
    } else if (process.env[req.params.key]) {
        logger.info("getting key");
        return res.status(200).json({
            "key": req.params.key,
            "secret": process.env[req.params.key]
        });
    } else {
        return next(new AppNotFoundError("key not found" ));
    };
};

module.exports = { getSecretByKey };