const ApiErrors = require('../middlewares/apiErrors');

const MovieModel = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
    const userId = req.user?._id;

    MovieModel.find({ owner: userId })
        .then((movies) => res.json({ movies }))
        .catch((e) => {
            next(e);
        });
};

module.exports.createMovie = (req, res, next) => {
    const userId = req.user?._id;
    const {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
    } = req.body;

    MovieModel.countDocuments({ owner: userId, movieId })
        .then((count) => {
            if (count > 0) {
                next(ApiErrors.BadRequest('Вы уже добавляли фильм с таким id'));
            }

            MovieModel.create({
                owner: userId,
                country,
                director,
                duration,
                year,
                description,
                image,
                trailerLink: trailer,
                nameRU,
                nameEN,
                thumbnail,
                movieId,
            })
                .then((movie) => res.status(201).json({
                    movie: {
                        _id: movie._id,
                        owner: userId,
                        country,
                        director,
                        duration,
                        year,
                        description,
                        image,
                        trailer,
                        nameRU,
                        nameEN,
                        thumbnail,
                        movieId,
                    },
                }))
                .catch((e) => {
                    next(e);
                });
        })
        .catch((e) => {
            next(e);
        });
};

module.exports.deleteMovie = (req, res, next) => {
    const userId = req.user?._id;
    const movieId = req.params?.movieId;

    MovieModel.findById(movieId)
        .then((movie) => {
            if (movie.owner.toString() !== userId) {
                throw ApiErrors.NotAllowed();
            }
            if (!movie) {
                throw ApiErrors.NotFound(`Фильм ${movieId} не найден`);
            }
            MovieModel.deleteOne({ _id: movieId })
                .then(() => res.json({ message: `Фильм ${movieId} успешно удален` }))
                .catch((e) => {
                    next(e);
                });
        })
        .catch((e) => {
            next(e);
        });
};
