import Sequelize from 'sequelize';

// Databas name is sketchymine, postgres name is sketchymine_user, password for user is 12345
const sequelize = new Sequelize('sketchymine', 'sketchymine_user', '12345', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
