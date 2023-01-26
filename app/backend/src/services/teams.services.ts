import Teams from '../database/models/Teams';

type TeamsServiceProps = {
  id?: number;
  teamName?: string;
};

class TeamsService {
  private id?: number;
  private teamName?: string;
  private teams?: Teams[];

  constructor({
    id,
    teamName,
  }: TeamsServiceProps) {
    this.id = id;
    this.teamName = teamName;
  }

  async getAll() {
    const teams = await Teams.findAll();
    this.teams = teams;
    return teams;
  }

  async getTeamById() {
    const team = await Teams.findOne({ where: { id: this.id } });
    return team;
  }
}

export default TeamsService;
