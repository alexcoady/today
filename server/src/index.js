import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfigFn from './../../tasks/webpack.client.config.js';

import fallback from 'express-history-api-fallback';

import express, { Router } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import * as config from './config';

import User from './users/model';

import * as authHelpers from './auth/helpers';
import auth from './auth/router';

const PORT = process.env.PORT || 8080;
const PROD = process.env.NODE_ENV || 'production';




const app = express();

// IF DEV
const webpackConfig = webpackConfigFn();

app.use(webpackDevMiddleware(webpack(webpackConfig), {
  noInfo: true,
  stats: {
    colors: true
  },
  publicPath: `/${webpackConfig.output.publicPath}`
}));

// ELSE IF PRODUCTION
// TODO

// config
mongoose.connect(config.MONGODB);
app.set('superSecret', config.SECRET);

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

// logging
app.use(morgan('dev'));

app.get('/', (req, res) => {
  return res.send(`The API is available at http://localhost:${PORT}/api`);
});

app.use('/auth', auth);

const api = Router();

api.post('/authenticate', (req, res) => {

  User.findOne({ name: req.body.name }, (err, foundUser) => {

    if (err) throw err;

    if (!foundUser)
      return res.json({ success: false, message: 'Authentication failed. User not found' });

    if (foundUser.password !== req.body.password)
      return res.json({ success: false, message: 'Authentication failed. Username and password did not match' });

    const token = authHelpers.generateToken(foundUser, config.SECRET);

    res.json({
      success: true,
      message: 'Have this token :)',
      token
    });

  });
});

api.use((req, res, next) => {

  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) return res.status(403).send({
    success: false,
    message: 'No token provided'
  });

  jwt.verify(token, config.SECRET, (err, decoded) => {

    if (err)
      return res.json({ success: false, message: 'Failed to authenticate token' });

    req.decoded = decoded;
    next();
  });
});

api.get('/', (req, res) => {

  return res.json({ message: 'Welcome to the root of the today API' });
});

api.get('/users', (req, res) => {

  User.find({}, (err, users) => {

    if (err) throw err;

    res.json(users);

  });
});

app.use('/api', api);

app.use(fallback('index.html', { root: __dirname }));

app.listen(PORT, () => {
  console.log(`server started, bitches PORT: ${PORT}`);
})
