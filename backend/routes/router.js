const router = require('express').Router();

const userRouter = require('./users.router');
const cardRouter = require('./cards.router');
const authRouter = require('./auth.router');

const { auth } = require('../middleware/auth.middleware');
const { NOT_FOUND_CODE, NOT_FOUND_ERROR_MESSAGE } = require('../utils/constants');
const { NotFoundError } = require('../errors/errors');

router.use('/', authRouter);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(`${NOT_FOUND_CODE}. ${NOT_FOUND_ERROR_MESSAGE}`));
});

module.exports = router;
