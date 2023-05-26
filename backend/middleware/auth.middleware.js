const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_ERROR_MESSAGE } = require('../utils/constants');
const { AuthorizationError } = require('../errors/errors');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError(UNAUTHORIZED_ERROR_MESSAGE);
  }
  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = payload;
  } catch (err) {
    next(new AuthorizationError(UNAUTHORIZED_ERROR_MESSAGE));
  }

  next();
};
