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

interface leaderboardsInterface {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

class LeaderboardsCreator {
  matches: MatchInterface[];
  leaderboards: leaderboardsInterface[];

  constructor(matches: MatchInterface[]) {
    this.matches = matches;
    this.leaderboards = [];
  }

  private populateLeaderboards() {
    this.matches.forEach((match) => {
      const index = this.leaderboards.findIndex((team) => team.name === match.homeTeam.teamName);
      if (index === -1) {
        this.leaderboards.push({
          name: match.homeTeam.teamName,
          totalPoints: 0,
          totalGames: 0,
          totalVictories: 0,
          totalDraws: 0,
          totalLosses: 0,
          goalsFavor: 0,
          goalsOwn: 0,
          goalsBalance: 0,
          efficiency: 0,
        });
      }
    });
  }

  private populateAwayLeaderboards() {
    this.matches.forEach((match) => {
      const index = this.leaderboards.findIndex((team) => team.name === match.awayTeam.teamName);
      if (index === -1) {
        this.leaderboards.push({
          name: match.awayTeam.teamName,
          totalPoints: 0,
          totalGames: 0,
          totalVictories: 0,
          totalDraws: 0,
          totalLosses: 0,
          goalsFavor: 0,
          goalsOwn: 0,
          goalsBalance: 0,
          efficiency: 0,
        });
      }
    });
  }

  private changeHome(index: number, match: MatchInterface) {
    this.leaderboards[index].totalGames += 1;
    this.leaderboards[index].goalsFavor += match.homeTeamGoals;
    this.leaderboards[index].goalsOwn += match.awayTeamGoals;
    this.leaderboards[index].goalsBalance += match.homeTeamGoals - match.awayTeamGoals;
    if (match.homeTeamGoals > match.awayTeamGoals) {
      this.leaderboards[index].totalPoints += 3;
      this.leaderboards[index].totalVictories += 1;
    } else if (match.homeTeamGoals < match.awayTeamGoals) {
      this.leaderboards[index].totalLosses += 1;
    } else {
      this.leaderboards[index].totalPoints += 1;
      this.leaderboards[index].totalDraws += 1;
    }
    this.leaderboards[index].efficiency = Number((
      (this.leaderboards[index].totalPoints / (this.leaderboards[index].totalGames * 3)) * 100)
      .toFixed(2));
  }

  private changeAway(index: number, match: MatchInterface) {
    this.leaderboards[index].totalGames += 1;
    this.leaderboards[index].goalsFavor += match.awayTeamGoals;
    this.leaderboards[index].goalsOwn += match.homeTeamGoals;
    this.leaderboards[index].goalsBalance += match.awayTeamGoals - match.homeTeamGoals;
    if (match.homeTeamGoals < match.awayTeamGoals) {
      this.leaderboards[index].totalPoints += 3;
      this.leaderboards[index].totalVictories += 1;
    } else if (match.homeTeamGoals > match.awayTeamGoals) {
      this.leaderboards[index].totalLosses += 1;
    } else {
      this.leaderboards[index].totalPoints += 1;
      this.leaderboards[index].totalDraws += 1;
    }
    this.leaderboards[index].efficiency = Number((
      (this.leaderboards[index].totalPoints / (this.leaderboards[index].totalGames * 3)) * 100)
      .toFixed(2));
  }

  private sortLeaderboards() {
    this.leaderboards.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.totalVictories === b.totalVictories) {
          if (a.goalsBalance === b.goalsBalance) {
            if (a.goalsFavor === b.goalsFavor) {
              return a.goalsOwn - b.goalsOwn;
            }
            return b.goalsFavor - a.goalsFavor;
          }
          return b.goalsBalance - a.goalsBalance;
        }
        return b.totalVictories - a.totalVictories;
      }
      return b.totalPoints - a.totalPoints;
    });
  }

  public calculateAllLeaderboards() {
    this.populateLeaderboards();
    this.populateAwayLeaderboards();
    this.matches.forEach((match) => {
      const homeTeamIndex = this.leaderboards
        .findIndex((team) => team.name === match.homeTeam.teamName);
      const awayTeamIndex = this.leaderboards
        .findIndex((team) => team.name === match.awayTeam.teamName);
      this.changeHome(homeTeamIndex, match);
      this.changeAway(awayTeamIndex, match);
    });
    this.sortLeaderboards();
    return this.leaderboards;
  }

  public calculateHomeLeaderboards() {
    this.populateLeaderboards();
    this.matches.forEach((match) => {
      const homeTeamIndex = this.leaderboards
        .findIndex((team) => team.name === match.homeTeam.teamName);
      this.changeHome(homeTeamIndex, match);
    });
    this.leaderboards.sort((a, b) => b.totalPoints - a.totalPoints);
    this.sortLeaderboards();
    return this.leaderboards;
  }

  public calculateAwayLeaderboards() {
    this.populateAwayLeaderboards();
    this.matches.forEach((match) => {
      const awayTeamIndex = this.leaderboards
        .findIndex((team) => team.name === match.awayTeam.teamName);
      this.changeAway(awayTeamIndex, match);
    });
    this.leaderboards.sort((a, b) => b.totalPoints - a.totalPoints);
    this.sortLeaderboards();
    return this.leaderboards;
  }
}

export default LeaderboardsCreator;
