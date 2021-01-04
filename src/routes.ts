import { Router } from 'express';
import { body } from 'express-validator';
import authMiddleware from './middlewares/auth';

import userController from './controllers/user';
import chartsController from './controllers/charts';

const routes = Router();

routes.post('/signup', [
    body('email')
      .trim()
      .isEmail()
      .withMessage('É necessário um email válido'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('A senha precisa ter entre 4 a 20 dígitos')
  ], userController.store);

routes.post('/signin', [
    body('email')
      .trim()
      .isEmail()
      .withMessage('É necessário um email válido'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Senha é obrigatória')
  ], userController.signIn);

routes.post('/createcharts', chartsController.store);

export default routes;
