const jwt = require('jsonwebtoken');

const ApiErrors = require('./apiErrors');

const { JWT_SECRET } = require('../constants');

const auth = (req, res, next) => {
    const token = req.headers?.authorization;
    if (!token) {
        throw ApiErrors.UnauthorizedError();
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        throw ApiErrors.UnauthorizedError();
    }
};

module.exports = auth;
