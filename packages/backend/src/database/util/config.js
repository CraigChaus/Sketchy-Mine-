import Sequelize from 'sequelize';

const { NODE_ENV } = process.env;
const { DB_URL } = process.env;

if (!DB_URL && NODE_ENV !== 'test') {
  const error = 'No DB_URL environment variable found, please ensure you have set up your .env file';
  throw new Error(error);
}

// eslint-disable-next-line import/no-mutable-exports
let sequelize;

if (NODE_ENV !== 'test') {
  sequelize = new Sequelize(DB_URL, {
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development',
  });
} else {
  sequelize = new Sequelize('sqlite::memory:', {
    loggging: false,
  });
}

export default sequelize;
