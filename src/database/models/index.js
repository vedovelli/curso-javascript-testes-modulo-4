import { Sequelize } from 'sequelize';
import { DATABASE_PATH } from '@/utils';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DATABASE_PATH,
  logging: false,
});

export const sync = async () => {
  await sequelize.sync();
};
