import { Router } from 'express';
import isLoggedIn from '../middleware/is_logged_in';
import isModerator from '../middleware/is_moderator';
import * as users from '../database/controllers/user_controller';

const router = Router();

/* Get users listing */
router.get('/', users.findAll);

/* Get user by ID */
router.get('/:id', isLoggedIn, users.findById);

/* Register user */
router.post('/', users.create);

/* Update User by id */
router.put('/:id', isLoggedIn, users.update);

/* Delete User by id */
router.delete('/:id', isLoggedIn, isModerator, users.deleteUser);

export default router;
