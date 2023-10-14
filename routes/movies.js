const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');

const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validations/movies');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', authMiddleware, getMovies);

router.post('/', authMiddleware, createMovieValidation, createMovie);

router.delete('/:movieId', authMiddleware, deleteMovieValidation, deleteMovie);

module.exports = router;
