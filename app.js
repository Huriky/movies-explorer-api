const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { signInValidation, signUpValidation } = require('./middlewares/validations/users');
const ApiErrors = require('./middlewares/apiErrors');

const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');

const errorsMiddleware = require('./middlewares/errorsReturn');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { login, createUser } = require('./controllers/users');

const { PORT, MONGO_URL } = require('./constants');
const limiter = require('./utils/rateLimiter');

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);

const whitelist = [
    'https://84.252.143.34:3000', 'http://84.252.143.34:3000',
    'https://localhost:3000', 'http://localhost:3000',
    'https://moviyes.nomoredomainsrocks.ru', 'http://moviyes.nomoredomainsrocks.ru',
];

const corsOptions = {
    origin(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'HEAD'],
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Request-Headers', 'Access-Control-Allow-Origin', 'Origin'],
};

app.use(cors(corsOptions));

app.post('/signin', signInValidation, login);
app.post('/signup', signUpValidation, createUser);

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.all('*', (req, res, next) => {
    next(ApiErrors.NotFound('Метод не найден'));
});

app.use(errorLogger);

app.use(errorsMiddleware);

app.listen(PORT, () => {
    console.info(`Сервер запущен на порту ${PORT}`);
});
