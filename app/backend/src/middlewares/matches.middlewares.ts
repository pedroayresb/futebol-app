import { Request, Response, NextFunction } from 'express';
import { MatchInterface } from '../interfaces/matches.interfaces';

const validateMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId,
    awayTeamId }: MatchInterface = req.body;
  if (homeTeamId === awayTeamId) {
    return res
      .status(422).json({ message: 'It is not possible to create a match with two equal teams' });
  }

  next();
};

export default validateMatch;
