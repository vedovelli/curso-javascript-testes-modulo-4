import { Model, DataTypes } from 'sequelize';
import { sequelize, sync } from '.';

export class User extends Model {}

User.init(
  {
    email: DataTypes.STRING,
  },
  { sequelize, modelName: 'user' },
);

sync();
