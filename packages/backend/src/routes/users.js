import { Router } from 'express';
import isLoggedIn from '../middleware/is_logged_in';
import * as users from '../database/controllers/user_controller';

const router = Router();

/* Get users listing */
router.get('/', isLoggedIn, users.findAll);

/* Get user by ID */
router.get('/:id', isLoggedIn, users.findById);

/* Register user */
router.post('/', users.create);

/* Update User by id */
router.put('/:id', isLoggedIn, users.update);

/* Delete User by id */
router.delete('/:id', isLoggedIn, users.deleteUser);

export default router;
