const ApiErrors = require('../apiErrors');
const { patchMe, signIn, signUp } = require('./schemas/users');

const usersValidations = {
    // eslint-disable-next-line consistent-return
    patchMeValidation(req, res, next) {
        const result = patchMe.validate(req.body);
        if (result.error) {
            return next(ApiErrors.BadRequest('Ошибка валидации', result.error.details[0].message));
        }
        next();
    },
    // eslint-disable-next-line consistent-return
    signInValidation(req, res, next) {
        const result = signIn.validate(req.body);
        if (result.error) {
            return next(ApiErrors.BadRequest('Ошибка валидации', result.error.details[0].message));
        }
        next();
    },
    // eslint-disable-next-line consistent-return
    signUpValidation(req, res, next) {
        const result = signUp.validate(req.body);
        if (result.error) {
            return next(ApiErrors.BadRequest('Ошибка валидации', result.error.details[0].message));
        }
        next();
    },
};

module.exports = usersValidations;
