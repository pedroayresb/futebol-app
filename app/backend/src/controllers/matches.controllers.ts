import { Request, Response } from 'express';
import MatchService from '../services/matches.services';

const getAllMatches = async (req: Request, res: Response) => {
  const matches = await new MatchService({}).getAllMatches();
  return res.status(200).json(matches);
};

const getInProgressMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (!inProgress) {
    return getAllMatches(req, res);
  }
  const isTrue = (inProgress === 'true');
  const matches = await new MatchService({ inProgress: isTrue }).getInProgressMatches();
  return res.status(200).json(matches);
};

const createMatch = async (req: Request, res: Response) => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
  const match = await new MatchService({
    homeTeamId,
    awayTeamId,
    homeTeamGoals,
    awayTeamGoals }).createMatch();
  if (match === 'error') {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  return res.status(201).json(match);
};

const updateMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const match = await new MatchService({
    id: Number(id),
    homeTeamGoals,
    awayTeamGoals }).updateMatch();
  if (!match) {
    return res.status(400).json({ error: 'Match not found' });
  }
  return res.status(200).json(match);
};

const finishMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamId, awayTeamId } = req.body;
  const match = await new MatchService({ id: Number(id), homeTeamId, awayTeamId }).finishMatch();
  if (!match) {
    return res.status(400).json({ error: 'Match not found' });
  }
  return res.status(200).json({ message: 'Finished' });
};

export { getAllMatches, getInProgressMatches, createMatch, updateMatch, finishMatch };
