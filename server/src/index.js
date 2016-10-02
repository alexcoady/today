import express, { Router } from 'express';

const app = express();

const api = Router();

api.get('/', (req, res) => {

  return res.json({ api: 'yay!' });
});

app.get('/', (req, res) => {
  return res.json({ whatever: 'lol' });
});

app.use('/api', api);

app.listen(3000, () => {
  console.log('server started, bitches');
})
