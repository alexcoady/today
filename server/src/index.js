import express, { Router } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';

import jwt from 'jsonwebtoken';
import { MONGODB, SECRET } from './config';
import User from './users/model';

const app = express();

// config
const PORT = process.env.PORT || 8080;
mongoose.connect(MONGODB);
app.set('superSecret', SECRET);

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// loggin
app.use(morgan('dev'));

app.get('/', (req, res) => {
  return res.send(`The API is available at http://localhost:${PORT}/api`);
});

// app.get('/setup', (req, res) => {
//
//   let fakeUser = new User({
//     name: 'Alex Coady',
//     password: 'omgapassword',
//     admin: true
//   });
//
//   fakeUser.save(err => {
//
//     if (err) throw err;
//
//     console.log('fake user added successfully');
//
//     res.json({ success: true });
//
//   });
// });


const api = Router();

api.use((req, res, next) => {

  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) return res.status(403).send({
    success: false,
    message: 'No token provided'
  });

  jwt.verify(token, app.get('superSecret'), (err, decoded) => {

    if (err)
      return res.json({ success: false, message: 'Failed to authenticate token' });

    console.log(decoded)
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

api.post('/authenticate', (req, res) => {

  User.findOne({ name: req.body.name }, (err, foundUser) => {

    if (err) throw err;

    if (!foundUser)
      return res.json({ success: false, message: 'Authentication failed. User not found' });

    if (foundUser.password !== req.body.password)
      return res.json({ success: false, message: 'Authentication failed. Username and password did not match' });

    const token = jwt.sign(foundUser, app.get('superSecret'), {
      expiresIn: '1d'
    });

    res.json({
      success: true,
      message: 'Have this token :)',
      token
    });

  });
});

app.use('/api', api);

app.listen(PORT, () => {
  console.log(`server started, bitches PORT: ${PORT}`);
})
