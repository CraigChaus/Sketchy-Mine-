import { INTEGER, ARRAY, STRING } from 'sequelize';
import sequelize from '../util/config';

const words = sequelize.define('words', {
  word_list: {
    type: ARRAY(sequelize.STRING),
    primaryKey: true,
    autoincrement: true,
  },
  total_words: {
    type: INTEGER,
    allowNull: false,
  },
});

export default words;
