// NPM dependencies
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {

  res.json({
    data: req.user
  });
});

router.put('/', (req, res, next) => {

  if (req.user.settings !== req.body.settings)
    req.user.settings = {...req.user.settings, ...req.body.settings};

  if (req.user.name !== req.body.name)
    req.user.name = req.body.name;

  req.user.save(err => {

    if (err) return next(err);

    return res.json({
      data: req.user
    });
  });
});

export default router;
