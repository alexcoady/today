// NPM dependencies
import { Router } from 'express';

// App dependencies
import Day from './model';

const router = Router();

router.get('/', (req, res) => {

  Day.find({}, (err, days) => {

    if (err) return res.json({
      errors: [err]
    });

    res.json({
      data: days
    });
  });
});

router.post('/', (req, res) => {

  Day.findOne({ date: req.body.date })
  .then(foundDay => {

    if (!foundDay) return Day.create({
      _user: req.user,
      date: req.body.date,
      isGood: req.body.isGood === '1'
    });

    return foundDay;

  })
  .then(day => {
    res.send({ data: day });
  })
  .catch(err => {
    res.json({ errors: [err] })
  });
});

router.put('/:_id', (req, res) => {

  Day.findOne({ _id: req.params._id })
  .then(day => {
    day.isGood = req.body.isGood === '1';
    return day.save();
  })
  .then(day => {
    res.send({ data: day });
  })
  .catch(err => {
    res.json({ errors: [err] })
  });
});

export default router;
