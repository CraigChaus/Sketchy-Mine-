import debug from 'debug';
import User from './models/user_model';
import words from './models/word_bank';
import { IS_PROD } from '../app';
import sequelize from './util/config';

const dbg = debug('db');

const setupDatabase = async () => {
  try {
    await sequelize.authenticate();
    dbg('Database connection successful.');

    await User.sync({ force: !IS_PROD });
    dbg('User table created/updated.');
    await words.sync({ force: !IS_PROD });
    dbg('Words table created/updated.');
  } catch (error) {
    console.error(error);
  }
};

export default setupDatabase;
