import { Router } from 'express';

const { StatusCodes } = require('http-status-codes');
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');

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

/* Register user */
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    users.push({
      id: users.length + 1,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 12),
      secret: uuid(),
    });

    res
      .status(StatusCodes.CREATED)
      .send('User registered!');
  } catch {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send('Please fill in username/password');
  }
});

export default router;
