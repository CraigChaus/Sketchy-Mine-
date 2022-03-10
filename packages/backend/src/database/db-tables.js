// Database
import { authenticate } from './util/database_config';
import { sync } from './database_models/user_model';

authenticate().then(() => {
  console.log('Database connection successful.');
}).catch((err) => {
  console.log(err);
});

sync({ force: true }).then(() => {
  console.log('User table created/updated.');
}).catch(() => {
  console.log('Error synching users table');
});
