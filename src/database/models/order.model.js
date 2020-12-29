import { Model, DataTypes } from 'sequelize';
import { sequelize, sync } from '../models';

export class Order extends Model {}

Order.init(
  {
    userid: DataTypes.INTEGER,
    products: DataTypes.TEXT,
  },
  { sequelize, modelName: 'order' },
);

sync();
