import { Router } from 'express';
import { getHomeClassification,
  getAwayClassification,
  getAllClassification } from '../controllers/leaderboards.controllers';

const router = Router();

router
  .get('/home', getHomeClassification)
  .get('/away', getAwayClassification)
  .get('/', getAllClassification);

export default router;
