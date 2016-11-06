// NPM dependencies
// import _ from 'lodash';
import { Router } from 'express';

// Feature dependencies
import Thing from './model';

const router = Router();

router.get('/', (req, res) => {

  Thing.find({
    _user: req.user,
    deleted: false
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

router.put('/:_id', (req, res, next) => {

  Thing.findByIdAndUpdate(req.params._id, { name: req.body.name })
  .then(thing => {
    res.json({
      data: thing
    })
  })
  .catch(err => {
    next(err);
  });
});

router.delete('/:_id', (req, res, next) => {

  Thing.findByIdAndUpdate(req.params._id, { deleted: true })
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
