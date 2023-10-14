const ApiErrors = require('../apiErrors');
const { createMovie, deleteMovie } = require('./schemas/movies');

const moviesValidations = {
    // eslint-disable-next-line consistent-return
    createMovieValidation(req, res, next) {
        const result = createMovie.validate(req.body);
        if (result.error) {
            return next(ApiErrors.BadRequest('Ошибка валидации', result.error.details[0].message));
        }
        next();
    },
    // eslint-disable-next-line consistent-return
    deleteMovieValidation(req, res, next) {
        const result = deleteMovie.validate(req.params);
        if (result.error) {
            return next(ApiErrors.BadRequest('Ошибка валидации', result.error.details[0].message));
        }
        next();
    },
};

module.exports = moviesValidations;
