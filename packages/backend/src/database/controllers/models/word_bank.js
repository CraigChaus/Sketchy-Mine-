import { INTEGER, DataTypes } from 'sequelize';
import sequelize from '../util/config';

const WordBank = sequelize.define('wordBank', {
  word_list: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  total_words: {
    type: INTEGER,
    allowNull: false,
  },
});

export default WordBank;
