import { Router } from 'express';
import { login, validate } from '../controllers/login.controllers';
import { validateEmail, validatePassword } from '../middlewares/login.middlewares';
import validateToken from '../middlewares/validateToken';

const router = Router();

router
  .get('/validate', validateToken, validate)
  .post('/', validateEmail, validatePassword, login);

export default router;
