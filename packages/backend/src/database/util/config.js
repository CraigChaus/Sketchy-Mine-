import Sequelize from 'sequelize';

const { DB_URL } = process.env;
if (!DB_URL) {
  const error = 'No DB_URL environment variable found, please ensure you have set up your .env file';
  throw new Error(error);
}

const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development',
});

export default sequelize;
