const Joi = require('joi');

const usersSchema = {
    patchMe: Joi.object().keys({
        name: Joi.string().min(2).max(30).required(),
        email: Joi.string().email().required(),
    }),
    signIn: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
    signUp: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        name: Joi.string().min(2).max(30).required(),
    }),
};

module.exports = usersSchema;
