const ApiErrors = require('./apiErrors');

// eslint-disable-next-line no-unused-vars
const errorsReturn = (err, req, res, next) => {
    if (err instanceof ApiErrors) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }

    return res.status(500).json({ message: 'На сервере произошла ошибка' });
};

module.exports = errorsReturn;
