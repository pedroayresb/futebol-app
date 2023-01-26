interface TeamInterface {
  id?: number;
  teamName?: string;
}

export interface MatchInterface {
  id?: number;
  homeTeamId?: number;
  homeTeamGoals?: number;
  awayTeamId?: number;
  awayTeamGoals?: number;
  inProgress?: boolean;
  homeTeam?: TeamInterface;
  awayTeam?: TeamInterface;
}
