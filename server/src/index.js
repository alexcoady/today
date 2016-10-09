/*global global, process*/
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
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

import auth from './auth/router';

const PORT = process.env.PORT || 8080;
// const PROD = process.env.NODE_ENV || 'production';

const app = express();

// IF DEV
const webpackConfig = webpackConfigFn();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  stats: {
    colors: true
  },
  publicPath: `/${webpackConfig.output.publicPath}`
}));

app.use(webpackHotMiddleware(compiler));

// ELSE IF PRODUCTION
// TODO

// config
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB);
app.set('superSecret', config.SECRET);

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

// logging
app.use(morgan('dev'));

app.use('/auth', auth);

const api = Router();

api.use((req, res, next) => {

  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) return res.status(403).send({
    success: false,
    message: 'No token provided'
  });

  jwt.verify(token, config.SECRET, (err, decoded) => {

    if (err)
      return res.status(401).json({ success: false, message: 'Failed to authenticate token' });

    req.decoded = decoded;
    next();
  });
});

api.use((req, res, next) => {

  const id = req.decoded.id;
  User.findById(id, (err, user) => {

    if (err)
      return res.status(500).json({ success: false, message: err });

    if (!user)
      return res.status(401).json({ success: false, message: 'User not found' });

    console.log(`Welcome back, ${user.name}`);
    req.user = user;
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

api.get('/user', (req, res) => {
  res.json(req.user);
});

api.put('/user', (req, res) => {

  const user = req.user;
  const formUser = req.body;

  if (formUser.name !== user.name) {
    user.name = formUser.name;
  }

  user.save(err => {

    if (err) throw err;
    return res.json(req.user);
  });
});

app.use('/api', api);

app.use(fallback('index.html', { root: __dirname }));

app.listen(PORT, () => {
  console.log(`server started, bitches PORT: ${PORT}`);
})
