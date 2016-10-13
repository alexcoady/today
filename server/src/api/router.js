// NPM dependencies
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';


// App dependencies
import * as config from './../config';
import User from './../users/model';

const api = Router();

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

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

  if (req.user.settings !== req.body.settings)
    req.user.settings = {...req.user.settings, ...req.body.settings};

  if (req.user.name !== req.body.name)
    req.user.name = req.body.name;

  req.user.save(err => {

    if (err) throw err;
    return res.json(req.user);
  });
});


export default api;
