// Database
const sequelize = require('./util/database_config');
const User = require('./database_models/user_model');

sequelize.authenticate().then(() => {
  console.log('Database connection successful.');
}).catch((err) => {
  console.log(err);
});

User.sync({ force: true }).then(() => {
  console.log('User table created/updated.');
}).catch(() => {
  console.log('Error synching users table');
});
