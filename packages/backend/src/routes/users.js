import { Router } from 'express';

const { StatusCodes } = require('http-status-codes');

const router = Router();
const users = require('../data/users');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send(users);
});

/* Get user by ID */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((us) => us.id === id);

  if (user) {
    res.send(user);
  } else {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(`User with id ${id} not found`);
  }
});

export default router;
