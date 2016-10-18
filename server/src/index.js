/*global global, process*/
import express from 'express';
import fallback from 'express-history-api-fallback';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import Promise from 'bluebird';

import * as config from './config';
import * as webpack from './webpack';

import auth from './auth/router';
import api from './api/router';

const PORT = process.env.PORT || 8080;
// const PROD = process.env.NODE_ENV || 'production';

const app = express();

// IF DEV
app.use(webpack.devMiddleware);
app.use(webpack.hotMiddleware);

// ELSE IF PRODUCTION
// TODO

// config
mongoose.Promise = Promise;
mongoose.connect(config.MONGODB);
app.set('superSecret', config.SECRET);

// middleware


app.use(passport.initialize());

// logging
app.use(morgan('dev'));

app.use('/auth', auth);

app.use('/api', api);

app.use(fallback('index.html', { root: __dirname }));

app.listen(PORT, () => {
  console.log(`server started, bitches PORT: ${PORT}`);
})
