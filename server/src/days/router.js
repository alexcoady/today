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

router.post('/', (req, res, next) => {

  const day = new Day({
    _user: req.user,
    date: req.body.date,
    isGood: req.body.isGood
  });

  day.save(err => {

    if (err) return next(err);

    res.json({
      data: {
        day: day
      }
    });
  })
});

export default router;
