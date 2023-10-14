const Joi = require('joi');
// eslint-disable-next-line no-useless-escape
const pattern = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;

const moviesSchema = {
    createMovie: Joi.object().keys({
        country: Joi.string().required(),
        director: Joi.string().required(),
        duration: Joi.number().positive().required(),
        year: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().regex(pattern).required(),
        trailer: Joi.string().regex(pattern).required(),
        nameRU: Joi.string().required(),
        nameEN: Joi.string().required(),
        thumbnail: Joi.string().regex(pattern).required(),
        movieId: Joi.number().positive().required(),
    }),
    deleteMovie: Joi.object().keys({
        movieId: Joi.string().length(24).hex().required(),
    }),
};

module.exports = moviesSchema;
