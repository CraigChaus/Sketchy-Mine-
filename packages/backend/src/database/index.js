/* eslint-disable no-console */
import debug from 'debug';
import fs from 'fs';
import User from './controllers/models/user_model';
import Word from './controllers/models/word_model';
import { IS_PROD } from '../app';
import sequelize from './util/config';

const dbg = debug('db');

function addInitialWordsToWordBank() {
  fs.readFileSync(process.env.WORDBANK).toString().split('\n').forEach((line, index, arr) => {
    if (index === arr.length - 1 && line === '') { return; }
    const newWord = { word: line };
    Word.create(newWord);
  });
  dbg('Wordbank initialized.');
}

const setupDatabase = async () => {
  try {
    await sequelize.authenticate();
    dbg('Database connection successful.');
    await User.sync({ force: (process.env.SYNC === 'true') ?? !IS_PROD });
    dbg('User table created/updated.');
    await Word.sync();
    dbg('Word table created/updated.');
    addInitialWordsToWordBank();
  } catch (error) {
    console.error(error);
  }
};

export default setupDatabase;
