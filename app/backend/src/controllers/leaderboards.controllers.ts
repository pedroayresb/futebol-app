import { Request, Response } from 'express';
import LeaderboardsService from '../services/leaderboards.services';

const getHomeClassification = async (req: Request, res: Response) => {
  const homeClassification = await LeaderboardsService.getHomeClassification();
  return res.status(200).json(homeClassification);
};

const getAwayClassification = async (req: Request, res: Response) => {
  const awayClassification = await LeaderboardsService.getAwayClassification();
  return res.status(200).json(awayClassification);
};

const getAllClassification = async (req: Request, res: Response) => {
  const allClassification = await LeaderboardsService.getAllClassification();
  return res.status(200).json(allClassification);
};

export { getHomeClassification, getAwayClassification, getAllClassification };
