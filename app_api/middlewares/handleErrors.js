const { AppError } = require("../utils/errors")

const handleErrors = (err, req, res, next) => {

    if (err instanceof AppError) {
        return res
            .status(err.getCode())
            .json({
                message: err.message
            });
    } else {
        return res
            .status(500)
            .json({
                message: err.message
            });
    }
}

module.exports = handleErrors;