import { BOOLEAN, INTEGER, STRING } from 'sequelize';

import sequelize from '../../util/config';

const User = sequelize.define('user', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
  },
  is_moderator: {
    type: BOOLEAN,
    defaultValue: false,
  },
  secret: {
    type: STRING,
  },
  total_emeralds: {
    type: INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

export default User;
