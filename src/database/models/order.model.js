/* istanbul ignore file */
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

// Cria a tabela no banco de dados caso ainda não exista
sync();
