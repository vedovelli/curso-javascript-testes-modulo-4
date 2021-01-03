/* istanbul ignore file */
/**
 * Este arquivo não é utilizado diretamente na
 * aplicação mas dá suporte aos models. Ele cria
 * uma instância do Sequelize utilizando o motor
 * para SQLite. Caso você queira utilizar outro
 * banco de dados, é aqui que você deverá fazer
 * a mudança.
 *
 * IMPORTANTE: não se esqueça de armazenar dados
 * sensíveis no arquivo .env e atualizar
 * @/utils/settings.js
 *
 * Mais informações: https://sequelize.org/master/
 */
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
