import { Router } from 'express';
import {
  getInProgressMatches,
  createMatch,
  updateMatch,
  finishMatch } from '../controllers/matches.controllers';

import validateToken from '../middlewares/validateToken';
import validateMatch from '../middlewares/matches.middlewares';

const router = Router();

router
  .get('/?', getInProgressMatches)
  .post('/', validateToken, validateMatch, createMatch)
  .patch('/:id', validateToken, updateMatch)
  .patch('/:id/finish', validateToken, finishMatch);

export default router;
