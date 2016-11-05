// NPM dependencies
import _ from 'lodash';
import { Router } from 'express';

// Feature dependencies
import Thing from './model';

const router = Router();

router.get('/', (req, res) => {

  Thing.find({
    _user: req.user
  })
  .exec()
  .then(things => {
    res.json({
      data: things
    })
  })
  .catch(err => {
    res.json({
      errors: [err]
    })
  })
});

router.post('/', (req, res, next) => {

  Thing.create({...req.body, _user: req.user.id})
  .then(thing => {
    res.json({
      data: thing
    })
  })
  .catch(err => {
    next(err);
  });
});

export default router;
