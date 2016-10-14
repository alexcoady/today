// NPM dependencies
import { Router } from 'express';
import bodyParser from 'body-parser';

// App dependencies
import * as middleware from './middleware';
import userApi from './../users/router';

const api = Router();

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

api.use(middleware.verifyToken);
api.use(middleware.populateUser);

api.get('/', (req, res) => res.json({ message: 'API root' }));

api.use('/user', userApi);

export default api;
