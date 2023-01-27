import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import LeaderboardsCreator from '../utils/leaderboardsCreator';

interface TeamInterface {
  id: number;
  teamName: string;
}

interface MatchInterface {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: TeamInterface;
  awayTeam: TeamInterface;
}

class LeaderboardsService {
  static async getAllClassification() {
    const matches = await Matches.findAll(
      { where: { inProgress: false },
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
    ) as unknown as MatchInterface[];
    const homeClassification = new LeaderboardsCreator(matches).calculateAllLeaderboards();
    return homeClassification;
  }

  static async getHomeClassification() {
    const matches = await Matches.findAll(
      { where: { inProgress: false },
        include: [
          {
            model: Teams,
            attributes: ['teamName'],
            as: 'homeTeam',
          },
        ],
      },
    ) as unknown as MatchInterface[];
    const homeClassification = new LeaderboardsCreator(matches).calculateHomeLeaderboards();
    return homeClassification;
  }

  static async getAwayClassification() {
    const matches = await Matches.findAll(
      { where: { inProgress: false },
        include: [
          {
            model: Teams,
            attributes: ['teamName'],
            as: 'awayTeam',
          },
        ],
      },
    ) as unknown as MatchInterface[];
    const awayClassification = new LeaderboardsCreator(matches).calculateAwayLeaderboards();
    return awayClassification;
  }
}

export default LeaderboardsService;
