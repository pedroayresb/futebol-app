import { Request, Response, NextFunction } from 'express';
import { MatchInterface } from '../interfaces/matches.interfaces';
import Teams from '../database/models/Teams';

const validateMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId,
    awayTeamId }: MatchInterface = req.body;
  if (homeTeamId === awayTeamId) {
    return res
      .status(422).json({ error: 'It is not possible to create a match with two equal teams' });
  }

  const hasHomeTeam = await Teams.findOne({ where: { id: homeTeamId } });
  const hasAwayTeam = await Teams.findOne({ where: { id: awayTeamId } });

  if (!hasHomeTeam || !hasAwayTeam) {
    return res.status(422).json({ error: 'There is no team with such id!' });
  }

  next();
};

export default validateMatch;
