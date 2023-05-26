const express = require('express');
const mongoose = require('mongoose').default;
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middleware/limiter.middleware');
const { requestLogger, errorLogger } = require('./middleware/reqlog.middleware');

require('dotenv').config();

const router = require('./routes/router');
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

const app = express();

app.use(limiter);
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
