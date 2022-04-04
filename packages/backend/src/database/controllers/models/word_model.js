import { INTEGER, STRING } from 'sequelize';

import sequelize from '../../util/config';

const Word = sequelize.define('word', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  word: {
    type: STRING,
    allowNull: false,
  },
});

export default Word;
