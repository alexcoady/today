// NPM dependencies
import jwt from 'jsonwebtoken';

// App dependencies
import * as config from './../config';
import User from './../users/model';

export const populateUser = (req, res, next) => {

  User.findById(req.decoded.id, (err, user) => {

    if (err)
      return res.status(500).json({ success: false, message: err });

    if (!user)
      return res.status(401).json({ success: false, message: 'User not found' });

    req.user = user;
    next();
  });
};

export const verifyToken = (req, res, next) => {

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
}
