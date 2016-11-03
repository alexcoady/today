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

  Thing.create(req.body.thing)
  .then(thing => {
    res.json({
      data: thing
    })
  })
  .catch(err => {
    next(err);
  });
});

// router.put('/', (req, res, next) => {
//
//   const newThings = _.filter(req.body.things, thing => !thing._id);
//
//   console.log('all', req.body.things);
//   console.log('new', newThings);
//
//   Thing.insertMany(_.map(newThings, thing => {
//     return {...thing, _user: req.user.id};
//   }))
//   .then(things => {
//     res.json({
//       data: things
//     })
//   })
//   .catch(err => {
//     next(err);
//   });
// });

export default router;
