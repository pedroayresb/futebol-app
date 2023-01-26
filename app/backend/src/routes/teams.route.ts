import { Router } from 'express';
import { getTeam, getTeamById } from '../controllers/teams.controllers';

const router = Router();

router
  .get('/', getTeam)
  .get('/:id', getTeamById);

export default router;
