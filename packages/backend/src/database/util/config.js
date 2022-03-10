import Sequelize from 'sequelize';
import { IS_PROD } from '../../app';

const { DB_URL } = process.env;
if (!DB_URL) {
  const error = 'No DB_URL environment variable found, please ensure you have set up your .env file';
  throw new Error(error);
}

const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  logging: !IS_PROD,
});

export default sequelize;
