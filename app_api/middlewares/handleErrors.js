const { AppError } = require("../utils/errors");
const logger = require("./logger");

const handleErrors = (err, req, res, next) => {
    let statusCode = 500;
    if (err instanceof AppError) {
        statusCode = err.getCode();
        if (statusCode < 500) {
            logger.warn(`${err.message}`);
        } else {
            logger.error(`${err.message} ${err.stack}`);
        }
    }

    return res
        .status(statusCode)
        .json({
            message: err.message
        });
}

module.exports = handleErrors;