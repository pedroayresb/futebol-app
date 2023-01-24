import { Model, DataTypes } from 'sequelize';
import Teams from './Teams';
import db from '.';

class Matches extends Model {
  public _id!: number;
  public _homeTeamId!: number;
  public _homeTeamGoals!: number;
  public _awayTeamId!: number;
  public _awayTeamGoals!: number;
  public _inProgress!: boolean;

  public static associate() {
    Matches.belongsTo(Teams, { as: 'homeTeam', foreignKey: 'homeTeamId' });
    Matches.belongsTo(Teams, { as: 'awayTeam', foreignKey: 'awayTeamId' });
  }
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Matches.associate();

export default Matches;
