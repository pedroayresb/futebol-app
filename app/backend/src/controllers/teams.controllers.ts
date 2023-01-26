import { Request, Response } from 'express';
import TeamsService from '../services/teams.services';

const getTeam = async (req: Request, res: Response) => {
  const teams = await new TeamsService({}).getAll();
  res.send(teams);
};

const getTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await new TeamsService({ id: Number(id) }).getTeamById();
  res.send(team);
};

export {
  getTeam,
  getTeamById,
};
