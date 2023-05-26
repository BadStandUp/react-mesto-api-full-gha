const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { login, createUser } = require('../controllers/auth.controller');
const validateURL = require('../utils/validationConfig');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri().custom(validateURL),
  }),
}), createUser);

module.exports = router;
