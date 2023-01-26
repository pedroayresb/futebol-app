import { Model, DataTypes } from 'sequelize';
import Matches from './Matches';
import db from '.';

class Teams extends Model {
  public id!: number;
  public name!: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Teams.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeMatchs' });
Teams.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'awayMatchs' });

export default Teams;
