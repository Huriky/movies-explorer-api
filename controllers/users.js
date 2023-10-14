const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiErrors = require('../middlewares/apiErrors');

const { JWT_SECRET } = require('../constants');

const UserModel = require('../models/user');

module.exports.getMe = (req, res, next) => {
    const userId = req.user?._id;

    UserModel.findById(userId)
        .then((user) => res.json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
            },
        }))
        .catch((e) => {
            next(e);
        });
};

module.exports.patchMe = (req, res, next) => {
    const { name, email } = req.body;
    const userId = req.user?._id;

    UserModel.findOne({ email })
        .then((checkUser) => {
            if (checkUser && checkUser._id.toString() !== userId) {
                next(ApiErrors.AlreadyExists());
            } else {
                UserModel.updateOne({ _id: userId }, {
                    $set: { name, email },
                })
                    .then((user) => res.json({
                        user: {
                            _id: user._id,
                            email,
                            name,
                        },
                    }))
                    .catch((e) => {
                        next(e);
                    });
            }
        })
        .catch((e) => {
            next(e);
        });
};

module.exports.createUser = (req, res, next) => {
    const {
        name, email, password,
    } = req.body;

    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, (e, salt) => {
        bcrypt.hash(password, salt, (error, hash) => {
            if (error) {
                throw ApiErrors.ServerError();
            }
            UserModel.create({
                name, email, password: hash,
            })
                .then((user) => res.status(201).json({
                    _id: user._id, name, email,
                }))
                .catch((err) => {
                    if (err.code === 11000) {
                        next(ApiErrors.AlreadyExists());
                    }
                    next(err);
                });
        });
    });
};

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;

    UserModel.findOne({ email }).select('+password')
        // eslint-disable-next-line consistent-return
        .then((user) => {
            if (!user) {
                return next(ApiErrors.UnauthorizedError('Неправильная почта или пароль'));
            }

            // eslint-disable-next-line consistent-return
            bcrypt.compare(password, user.password, (err, result) => {
                if (!result) {
                    return next(ApiErrors.UnauthorizedError('Неправильная почта или пароль'));
                }

                const jwtToken = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

                res.json({
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    token: jwtToken,
                });
            });
        })
        .catch((e) => {
            next(e);
        });
};
