'use strict';

class AppError extends Error {

    constructor(message, status) {

        super();

        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message ||
            'Something went wrong. Please try again.';
        this.status = status || 500;
    }

    getCode() {
        return this.status;
    }

}

class AppBadRequestError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}

class AppNotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}

class AppUnauthorizedError extends AppError {
    constructor(message) {
        super(message, 401);
    }
}

module.exports = {
    AppError,
    AppBadRequestError,
    AppNotFoundError,
    AppUnauthorizedError
};