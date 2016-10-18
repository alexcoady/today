// NPM dependencies
import _ from 'lodash';
import Promise from 'bluebird';
import { Router } from 'express';

// App dependencies
import Thing from './../things/model';
import User from './../users/model';

const router = Router();

router.get('/', (req, res) => {

  User.populate(req.user, { path: 'things' })
    .then(populatedUser => {
      res.json({
        data: populatedUser
      });
    });
});

router.put('/', (req, res, next) => {

  const existingThings = Thing.find({ _user: req.user._id }).exec();
  const newThings = existingThings.then(things => {

    const existingThings = _.map(things, 'name');
    const newThings = _.filter(req.body.things, (thing) => {
      return existingThings.indexOf(thing) === -1;
    });

    if (newThings.length === 0) return [];

    console.log(`adding ${newThings.length} items to the collection`);

    return Thing.insertMany(_.map(newThings, thing => {
      return {
        _user: req.user._id,
        name: thing
      };
    }));

  });

  const allThings = Promise.all([existingThings, newThings]).spread((a, b) => {
    return [].concat(a, b);
  });

  const removedThings = allThings.then(things => {

    const hitList = _.map(_.filter(things, thing => {
      return req.body.things.indexOf(thing.name) === -1;
    }), '_id');

    console.log(`removing ${hitList.length} items from the collection`, hitList);

    return Thing.remove({ _id: { $in: hitList } }).exec();
  });

  removedThings.then(() => {
    return Thing.find({ _user: req.user._id }).exec();
  }).then(things => {

    if (req.user.settings !== req.body.settings)
      req.user.settings = {...req.user.settings, ...req.body.settings};

    if (req.user.name !== req.body.name)
      req.user.name = req.body.name;

    req.user.things = _.map(things, '_id');

    return req.user.save();

  }).then(user => {

    return User.populate(user, { path: 'things' });

  }).then(user => {

    return res.json({
      data: user
    });

  }).catch(err => {
    next(err);
  });
});

export default router;
