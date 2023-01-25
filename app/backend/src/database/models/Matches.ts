import { Model, DataTypes } from 'sequelize';
import Teams from './Teams';
import db from '.';

class Matches extends Model {
  public id!: number;
  public homeTeamId!: number;
  public homeTeamGoals!: number;
  public awayTeamId!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;

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
    field: 'hometeamid',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'hometeamgoals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'awayteamid',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'awayteamgoals',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'inprogress',
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Matches.associate();

export default Matches;
