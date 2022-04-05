/* eslint-disable no-console */
import debug from 'debug';
import fs from 'fs';
import User from './controllers/models/user_model';
import Word from './controllers/models/word_model';
import { IS_PROD } from '../app';
import sequelize from './util/config';

const dbg = debug('db');

// Add basic words from the words.db file to the database
function addInitialWordsToWordBank() {
  fs.readFileSync(process.env.WORD_BANK).toString().split('\n').forEach((line, index, arr) => {
    if (index === arr.length - 1 && line === '') { return; }
    const newWord = { word: line };
    Word.create(newWord);
  });
}
// Set up databse tables and seed it
const setupDatabase = async () => {
  try {
    await sequelize.authenticate();
    dbg('Database connection successful.');
    await User.sync({ force: (process.env.SYNC === 'true') ?? !IS_PROD });
    dbg('User table created/updated.');
    await Word.sync({ force: true });
    dbg('Word table created/updated.');
    addInitialWordsToWordBank();
    dbg('Wordbank initialized.');
  } catch (error) {
    console.error(error);
  }
};

export default setupDatabase;
