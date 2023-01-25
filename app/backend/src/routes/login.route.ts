import { Router } from 'express';
import { login, validate } from '../controllers/login.controllers';
import { validateEmail, validatePassword } from '../middlewares/login.middlewares';
import validateToken from '../middlewares/validateToken';

const router = Router();

router
  .post('/', validateEmail, validatePassword, login)
  .get('/validate', validateToken, validate);

export default router;
