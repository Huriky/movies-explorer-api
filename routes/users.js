const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');

const { patchMeValidation } = require('../middlewares/validations/users');

const { patchMe, getMe } = require('../controllers/users');

router.get('/me', authMiddleware, getMe);

router.patch('/me', authMiddleware, patchMeValidation, patchMe);

module.exports = router;
