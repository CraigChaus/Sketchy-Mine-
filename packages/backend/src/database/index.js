import debug from 'debug';
import sequelize from './util/config';
import User from './models/user_model';
import { IS_PROD } from '../app';

const dbg = debug('db');

const setupDatabase = async () => {
  sequelize.authenticate().then(() => {
    dbg('Database connection successful.');
  }).catch((err) => {
    console.error(err);
  });

  User.sync({ force: !IS_PROD }).then(() => {
    dbg('User table created/updated.');
  }).catch(() => {
    console.error('Error synching users table');
  });
};

export default setupDatabase;
