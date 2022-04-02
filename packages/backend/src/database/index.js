/* eslint-disable no-console */
import debug from 'debug';
import User from './controllers/models/user_model';
import Word from './controllers/models/word_model';
// import WordBank from './models/word_bank';
import { IS_PROD } from '../app';
import sequelize from './util/config';

const dbg = debug('db');

const setupDatabase = async () => {
  try {
    await sequelize.authenticate();
    dbg('Database connection successful.');
    await User.sync({ force: (process.env.SYNC === 'true') ?? !IS_PROD });
    dbg('User table created/updated.');
    await Word.sync();
    dbg('Word table created/updated.');
  } catch (error) {
    console.error(error);
  }
};

export default setupDatabase;
