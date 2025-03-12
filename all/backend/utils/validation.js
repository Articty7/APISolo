// backend/utils/validation.js

// Import the validationResult function from the express-validator library
const { validationResult } = require('express-validator');

// Define a function called handleValidationErrors that takes in req, res, and next as arguments

const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = {};
        validationErrors.array().map((error => errors[error.path] = error.msg));
        const err = {};
       // const err =  new Error("Bad request.");
        err.errors = errors;
        err.status = 400;
        //err.title = "Bad request.";
        err.message ="Bad Request";
        next(err);
    }
    next();
};

module.exports = { handleValidationErrors };
