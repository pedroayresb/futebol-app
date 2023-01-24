import { Model, DataTypes } from 'sequelize';
import db from '.';

class Users extends Model {
  public _id!: number;
  public _username!: string;
  public _role!: string;
  public _email!: string;
  public _password!: string;
}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'username',
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'role',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'email',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'password',
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default Users;