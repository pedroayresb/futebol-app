import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

type MatchesServiceProps = {
  id?: number;
  homeTeamId?: number;
  awayTeamId?: number;
  inProgress?: boolean;
  homeTeamGoals?: number;
  awayTeamGoals?: number;
};

class MatchesService {
  private id?: number;
  private homeTeamId?: number;
  private awayTeamId?: number;
  private inProgress?: boolean;
  private homeTeamGoals?: number;
  private awayTeamGoals?: number;
  private matches?: Matches[];

  constructor({
    id,
    homeTeamId,
    awayTeamId,
    inProgress,
    homeTeamGoals,
    awayTeamGoals,
  }: MatchesServiceProps) {
    this.id = id;
    this.homeTeamId = homeTeamId;
    this.awayTeamId = awayTeamId;
    this.inProgress = inProgress;
    this.awayTeamGoals = awayTeamGoals;
    this.homeTeamGoals = homeTeamGoals;
  }

  async getAllMatches() {
    const matches = await Matches.findAll(
      {
        include: [
          {
            model: Teams,
            attributes: ['teamName'],
            as: 'homeTeam',
          },
          {
            model: Teams,
            attributes: ['teamName'],
            as: 'awayTeam',
          },
        ],
      },
    );
    this.matches = matches;
    return matches;
  }

  async getInProgressMatches() {
    const matches = await Matches.findAll({
      where: { inProgress: this.inProgress },
      include: [
        {
          model: Teams,
          attributes: ['teamName'],
          as: 'homeTeam',
        },
        {
          model: Teams,
          attributes: ['teamName'],
          as: 'awayTeam',
        },
      ],
    });
    this.matches = matches;
    return matches;
  }

  async createMatch() {
    const hasHomeTeam = await Teams.findOne({ where: { id: this.homeTeamId } });
    const hasAwayTeam = await Teams.findOne({ where: { id: this.awayTeamId } });
    if (!hasHomeTeam || !hasAwayTeam) {
      return 'error';
    }
    const match = await Matches.create({
      homeTeamId: this.homeTeamId,
      awayTeamId: this.awayTeamId,
      homeTeamGoals: this.awayTeamGoals,
      awayTeamGoals: this.awayTeamGoals,
      inProgress: true,
    });
    return match;
  }

  async updateMatch() {
    const match = await Matches.findOne({
      where: { id: this.id },
    });
    if (!match) {
      return null;
    }
    match.homeTeamGoals = this.homeTeamGoals as number;
    match.awayTeamGoals = this.awayTeamGoals as number;
    await match.save();
    return match;
  }

  async finishMatch() {
    const match = await Matches.findOne({ where: { id: this.id } });
    if (!match) {
      return null;
    }
    match.inProgress = false;
    await match.save();
    return match;
  }
}

export default MatchesService;
