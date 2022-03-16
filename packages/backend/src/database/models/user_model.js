import { INTEGER, STRING } from 'sequelize';
import sequelize from '../util/config';

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
  secret: {
    type: STRING,
  },
  total_emeralds: {
    type: INTEGER,
  },
});

export default User;
