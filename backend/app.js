const express = require('express');
const mongoose = require('mongoose').default;
require('dotenv').config();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/router');
const limiter = require('./middleware/limiter.middleware');
const { requestLogger, errorLogger } = require('./middleware/reqlog.middleware');
const { errorHandler } = require('./middleware/errors.middleware');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mestodb';
if (!process.env.JWT_TOKEN) {
  process.env.JWT_TOKEN = 'some-secret-key';
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
})
  .then(() => console.log('Connected'))
  .catch((err) => {
    console.log(err);
  });

const whitelist = {
  origin: [
    'https://my-mesto.nomoredomains.rocks',
    'http://my-mesto.nomoredomains.rocks',
    'http://localhost:3000',
  ],
};

const app = express();
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cors(whitelist));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
