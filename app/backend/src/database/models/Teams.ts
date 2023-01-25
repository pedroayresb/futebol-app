import { Model, DataTypes } from 'sequelize';
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
    field: 'id',
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name',
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default Teams;
