import { INTEGER, STRING } from 'sequelize';
import sequelize from '../util/database_config';

const User = sequelize.define('user', {
  user_id: {
    type: INTEGER,
    primaryKey: true,
    autoincrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
  },
  total_emeralds: {
    type: INTEGER,
  },
});

export default User;
