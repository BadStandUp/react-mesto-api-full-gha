const mongoose = require('mongoose');
const Card = require('../models/card.model');

const {
  NOT_FOUND_CARD_MESSAGE,
  CREATED_CODE,
  INCORRECT_ERROR_MESSAGE,
  OK_CODE,
} = require('../utils/constants');
const { IncorrectError, NotFoundError, ForbiddenError } = require('../errors/errors');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(CREATED_CODE).send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectError(`${INCORRECT_ERROR_MESSAGE} при создании карточки`));
      }
      return next(err);
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(OK_CODE).send({ data: card });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(NOT_FOUND_CARD_MESSAGE);
      }
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Доступ запрещён');
      }
      card.deleteOne()
        .then(() => {
          res.status(OK_CODE).send({ message: 'Карточка удалена' });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new IncorrectError(`${INCORRECT_ERROR_MESSAGE} карточки`));
      }
      return next(err);
    });
};

function changeLike(req, res, action, next) {
  Card.findByIdAndUpdate(req.params.cardId, action, {
    new: true,
    runValidators: true,
  })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) {
        throw new NotFoundError(NOT_FOUND_CARD_MESSAGE);
      }
      return res.status(OK_CODE).send({ card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new IncorrectError(`${INCORRECT_ERROR_MESSAGE} для лайка`));
      }
      return next(err);
    });
}

module.exports.likeCard = (req, res, next) => {
  changeLike(req, res, { $addToSet: { likes: req.user._id } }, next);
};

module.exports.dislikeCard = (req, res, next) => {
  changeLike(req, res, { $pull: { likes: req.user._id } }, next);
};
